import {Component, Input, OnInit} from '@angular/core';
import {User, UserProfile} from "../../../model/User";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() user: UserProfile | undefined;
  isSelf: boolean | undefined;
  me: User | undefined;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private chatService: ChatService) {
  }

  async ngOnInit() {
    this.me = await this.userService.getCurrentUser();
    this.isSelf = !!(this.user && this.user.id == this.me?.id);
  }

  canFollow(): boolean {
    if (this.user && this.me) {
      const imFollower = this.user.followers.find(x => x.id == this.me?.id);
      return !this.isSelf && !imFollower;
    }
    return false
  }

  follow() {
    if (this.user){
      this.userService.follow(this.user.id)
        .then((res) => {
          if (res && this.user && this.me) {
            this.user.followers.push(this.me);
            this.notificationService.notify('Following ' + this.user.username);
          }
        })
        .catch((e) => {
          this.notificationService.notify('Something happened. Try again later.')
        })
    }
  }

  unfollow() {
    if (this.user){
      this.userService.unfollow(this.user.id)
        .then((res) => {
          if (this.me && this.user){
            this.user.followers = this.user.followers.filter(x => x.id != this.me?.id);
            if (res) this.notificationService.notify('Unfollowed ' + this.user.username);
          }
        })
        .catch((e) => {
          this.notificationService.notify('Something happened. Try again later.')
        })
    }
  }

  chat() {
    if (this.user) this.chatService.createChat(this.user)
  }
}

