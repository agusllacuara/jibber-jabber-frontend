import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {User, UserProfile} from "../model/User";
import {Router} from "@angular/router";
import {EnvironmentProvider} from "../environments/EnvironmentProvider";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private router: Router, private auth: AuthService) {
  }

  getCurrentUser(): User | undefined {
    if (this.auth.getCurrentUser()) return this.auth.getCurrentUser();
    else {
      this.router.navigate(['login']);
      return undefined;
    }
  }

  modifyUsername(username: string) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    const request = this.http.put<User>(EnvironmentProvider.getGatewayURL() +'/users/update', username, {headers: header})
    request.subscribe((data) => {
        this.auth.currentUser = data;
      });
  }

  modifyPassword(password: string) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    this.http.post<User>(EnvironmentProvider.getGatewayURL() +'/users/password', password, {headers: header})
      .subscribe((data) => {
        this.auth.currentUser = data;
      });
  }

  searchUsername(searchUsername: string) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.post<UserProfile>(EnvironmentProvider.getGatewayURL() +'/search', searchUsername,{headers: header}).toPromise()
  }

  follow(id: number) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.post<boolean>(EnvironmentProvider.getGatewayURL() +'/follow', id, {headers: header}).toPromise();
  }

  unfollow(id: number) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.post<boolean>(EnvironmentProvider.getGatewayURL() +'/unfollow', id, {headers: header}).toPromise();
  }
}
