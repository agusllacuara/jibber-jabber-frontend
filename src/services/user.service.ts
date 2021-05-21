import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private currentUser: User | undefined;

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User | undefined {
    return this.currentUser ? this.currentUser : undefined;
  }

  modifyUsername(username: string) {

  }

  modifyPassword(password: string) {

  }

  modifyEmail(email: string) {

  }
}
