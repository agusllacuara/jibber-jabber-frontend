import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import {EnvironmentProvider} from "../environments/EnvironmentProvider";
import {ChatMessageDTO} from "../model/Message";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = new SockJS('/chat');
  stompClient = Stomp.over(this.socket);

  constructor() {
    this.connect();
  }


  connect() {
    this.stompClient.connect({}, (frame) => {
      (document.getElementById('connect') as any).disabled = true;
      (document.getElementById('disconnect') as any).disabled = false;
      (document.getElementById('response') as any).innerHTML = '';
      console.log('Connected: ' + frame);
    });
  }

  subscribe(topic: string, callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return
    }
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);
    })
  }

  sendMessage(msg: ChatMessageDTO) {
    this.stompClient.send(`/chat/${msg.receiver}`, {}, JSON.stringify(msg));
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, () => {
      callback();
    })
  }

}
