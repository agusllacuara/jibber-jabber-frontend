import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import {ChatMessageDTO} from "../model/Message";
import * as SockJS from "sockjs-client";
import {EnvironmentProvider} from "../environments/EnvironmentProvider";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = new SockJS(EnvironmentProvider.getChatUrl() + '/chat');
  stompClient = Stomp.over(this.socket);

  state: "disconnected" | "connected" = "disconnected";

  constructor() {
    this.connect();
  }

  connect() {
    this.stompClient.connect({}, (frame) => {
      (document.getElementById('connect') as any).disabled = true;
      (document.getElementById('disconnect') as any).disabled = false;
      (document.getElementById('response') as any).innerHTML = '';
      if (frame) this.state = "connected";
    });
  }

  subscribe(topic: string, callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.state = "connected";
      this.subscribeToTopic(topic, callback);
      return
    }
    this.state = "disconnected";
    this.stompClient.connect({}, () => {
      this.subscribe(topic, callback);
    })
  }

  sendMessage(msg: ChatMessageDTO) {
    this.stompClient.send(`/topic/messages/${msg.receiver}`, {}, JSON.stringify(msg));
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, callback)
  }

}
