import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import {EnvironmentProvider} from "../environments/EnvironmentProvider";
import {ChatMessageDTO} from "../model/Message";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = new WebSocket(EnvironmentProvider.getChatUrl());
  stompClient = Stomp.over(this.socket);

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
