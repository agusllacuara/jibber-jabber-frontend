import {Component, Input, OnInit} from '@angular/core';
import {Chat, ChatMessageDTO} from "../../../../model/Message";
import {UserService} from "../../../../services/user.service";
import {ChatService} from "../../../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chat: Chat | undefined;
  @Input() isOpen: boolean = false;
  nextMessage: string | undefined;

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
  }

  imMessageSender(message: ChatMessageDTO) {
    if (this.chat) {
      const myId = this.userService.getCurrentUser()?.id;
      return myId != message.sender;
    }
    return false;
  }

  send() {
    if (this.nextMessage && this.nextMessage.length > 1) {
      const me = this.userService.getCurrentUser()?.id == this.chat?.user1.id ? this.chat!.user1.id : this.chat!.user2.id;
      const other = this.userService.getCurrentUser()?.id != this.chat?.user1.id ? this.chat!.user1.id : this.chat!.user2.id;
      const msg = new ChatMessageDTO(0, me, other, this.nextMessage);
      this.chatService.sendMessage(msg);
      this.nextMessage = '';
    }
  }

  getFriendName() {
    return this.userService.getCurrentUser()?.id == this.chat?.user1.id ? this.chat!.user1.name : this.chat!.user2.name;
  }
}
