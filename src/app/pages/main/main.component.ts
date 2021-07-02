import {Component, OnInit} from '@angular/core';
import {User, UserProfile} from "../../../model/User";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentUser: User | undefined;
  searchUsername: string = '';
  viewMode: ViewMode = "feed";
  profileUser: UserProfile | undefined;

  constructor(private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  searchUser() {
    if (this.searchUsername && this.searchUsername.length > 1) {
      this.userService.searchUsername(this.searchUsername)
        .then((user) => {
          if (user.length == 0){
            this.notificationService.notify('No user found for: ' + this.searchUsername)
          }else{
            this.viewMode = 'profile';
            this.profileUser = user[0];
          }
        })
        .catch(e => {
          this.notificationService.notify('No user found for: ' + this.searchUsername)
          console.log(e);
        });
    }
  }

  setView(feed: ViewMode) {
    this.viewMode = feed;
  }

  setUserProfile(userProfile: UserProfile) {
    this.profileUser = userProfile;
    this.viewMode = 'profile';
  }

  badgeIsDisabled() {
    if (this.currentUser) {
      return !this.currentUser.hasUnreadMessages;
    } else {
      return true;
    }
  }
}

type ViewMode = 'feed' | 'profile';
