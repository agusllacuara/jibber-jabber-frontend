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
    const currentUser = this.userService.getCurrentUser();
    if (this.nextMessage && this.nextMessage.length > 1 && currentUser && this.chat) {
      const me = currentUser.id == this.chat.user1.id ? this.chat.user1.id : this.chat.user2.id;
      const other = currentUser.id != this.chat.user1.id ? this.chat.user1.id : this.chat.user2.id;
      const msg = new ChatMessageDTO(this.chat.chatId, me, other, this.nextMessage);
      this.chatService.sendMessage(msg);
      this.nextMessage = '';
      this.chat.messages.push(msg)
    } else {

    }
  }

  getFriendName() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && this.chat) {
      if(currentUser.id == this.chat.user1.id){
        return this.chat.user2.username;
      } else{
        return this.chat.user1.username;
      }
    } else {
      return '*******'
    }
  }
}
