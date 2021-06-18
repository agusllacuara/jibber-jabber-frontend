import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {User, UserProfile} from "../model/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private currentUser: User | undefined;

  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private router: Router) {
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User | undefined {
    if (this.currentUser) return this.currentUser;
    else {
      this.router.navigate(['login']);
      return undefined;
    }
  }

  modifyUsername(username: string) {
    this.http.post<User>('http://localhost:8080/change/username', username)
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  modifyPassword(password: string) {
    this.http.post<User>('http://localhost:8080/change/password', password)
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  searchUsername(searchUsername: string) {
    return this.http.post<UserProfile>('http://localhost:8080/search', searchUsername).toPromise()
  }

  follow(id: number) {
    return this.http.post<boolean>('http://localhost:8080/follow', id).toPromise();
  }

  unfollow(id: number) {
    return this.http.post<boolean>('http://localhost:8080/unfollow', id).toPromise();
  }
}
