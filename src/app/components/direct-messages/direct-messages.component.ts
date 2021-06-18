import {Component, OnInit} from '@angular/core';
import {Chat, ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {
  allChatsMap: Map<Chat, boolean> = new Map<Chat, boolean>();
  allChats: Chat[] = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.allChatsObservable.subscribe((next) => {
      next.forEach(x => {
        this.allChats = next;
        this.allChatsMap.set(x, false);
      })
      console.log(this.allChats)
    })
    this.chatService.getChats();
  }

  open(chat: Chat) {
    this.allChats.forEach(x => {
      if (x === chat) {
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
}
