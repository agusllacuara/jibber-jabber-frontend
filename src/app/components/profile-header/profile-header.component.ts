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

  user: UserProfile | undefined;

  @Input() set _user(user: UserProfile | undefined) {
    this.user = user;
    this.isSelf = !!(this.user && this.user.id == this.me?.id);
    this.getUserData();
  };

  isSelf: boolean | undefined;
  me: User | undefined;

  followers: UserProfile[] | undefined;
  following: UserProfile[] | undefined;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private chatService: ChatService) {
  }

  async ngOnInit() {
    this.me = await this.userService.getCurrentUser();
    this.isSelf = !!(this.user && this.user.id == this.me?.id);
  }

  canFollow(): boolean {
    if (this.user && this.me && this.followers) {
      console.log('Followers: ',this.followers)
      const imFollower = this.followers.find(x => x.id == this.me!.id);
      return !this.isSelf && !imFollower;
    } else {
      return false
    }
  }

  follow() {
    if (this.user) {
      this.userService.follow(this.user.id)
        .then((res) => {
          if (res && this.user && this.me && this.followers) {
            this.followers.push(this.me);
            this.userService.follow(this.user.id).then(() => {
              this.notificationService.notify('Following ' + this.user!.username);
            });
          }
        })
        .catch((e) => {
          this.notificationService.notify('Something happened. Try again later.')
        })
    }
  }

  unfollow() {
    if (this.user) {
      this.userService.unfollow(this.user.id)
        .then((res) => {
          if (this.me && this.user && this.followers) {
            this.followers = this.followers.filter(x => x.id != this.me!.id);
            if (res) this.notificationService.notify('Unfollowed ' + this.user.username);
            else this.notificationService.notify('Something happened. Try again later.')
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

  private getUserData() {
    if (this.user) {
      this.userService.getFollowers(this.user.id)
        .then((res: UserProfile[]) => {
          this.followers = res;
        });
      this.userService.getFollowing(this.user.id)
        .then((res: UserProfile[]) => {
          this.following = res;
        });
    }
  }
}

