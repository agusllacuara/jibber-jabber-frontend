import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jibber-jabber-frontend';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  async ngOnInit() {
    this.authService.loggedObserver.subscribe(
      async (logged) => {
        if (logged) {
          console.log('hola')
          await this.router.navigate(['feed']);
        } else {
          await this.router.navigate(['login'])
        }
      },
      (error) => {
        console.log(error)
        this.notificationService.notify('There was an error loading posts! Please reload or try again later.')
      });
  }

}
