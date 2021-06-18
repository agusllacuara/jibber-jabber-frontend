import {Component, Input, OnInit} from '@angular/core';
import {Chat, JibbyMessage} from "../../../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chat: Chat | undefined;
  @Input() isOpen: boolean = false;
  nextMessage: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  isSelf(message: JibbyMessage) {
    if (this.chat) {
      return this.chat.friend.id != message.sender.id;
    }
    return false;
  }

  send() {
    if (this.nextMessage && this.nextMessage.length > 1) {
      this.nextMessage = '';
    }
  }
}
