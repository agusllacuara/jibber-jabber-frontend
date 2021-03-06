import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {Chat} from "../../../model/Message";
import {SocketService} from "../../../services/socket.service";

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {
  allChatsMap: Map<Chat, boolean> = new Map<Chat, boolean>();
  allChats: Chat[] = [];
  openedId: number | undefined;

  constructor(private chatService: ChatService, private sktService: SocketService) {
  }

  ngOnInit(): void {
    this.chatService.allChatsObservable.subscribe((next) => {
      this.allChats = next;
      next.forEach(x => {
        const prev = this.allChatsMap.get(x);
        if (prev) {
          if (x.chatId == this.openedId) this.allChatsMap.set(x, true);
          this.allChatsMap.set(x, prev);
        } else {
          if (x.chatId == this.openedId) this.allChatsMap.set(x, true);
          this.allChatsMap.set(x, false);
        }
      })
    });
    this.chatService.getChats();
    this.chatService.subscribeToChatReceiverSocket();

    this.chatService.openChatEventObservable.subscribe((openChat) => {
      if (openChat) {
        this.open(openChat);
      }
    })
  }

  open(chat: Chat) {
    this.openedId = chat.chatId;
    this.allChats.forEach((x) => {
      if (x.chatId === chat.chatId) {
        this.allChatsMap.set(x, true);
      } else {
        this.allChatsMap.set(x, false);
      }
    })
  }

  chatIsOpen(chat: Chat): boolean {
    const bool = this.allChatsMap.get(chat);
    if (bool) return bool;
    else return false
  }

  getSocketStatus(): string {
    if (this.sktService.state == "disconnected") document.getElementById("message-color")!.style.color = "red";
    if (this.sktService.state == "connected") document.getElementById("message-color")!.style.color = "black";
    return 'Chat service is currently ' + this.sktService.state;
  }


}
