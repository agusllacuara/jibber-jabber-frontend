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
    this.http.put<User>(EnvironmentProvider.getGatewayURL() + '/users/update',
      {username: username},
      {headers: header}
    ).subscribe((data) => {
      this.auth.currentUser = data;
    });
  }

  modifyPassword(password: string) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    this.http.put<User>(EnvironmentProvider.getGatewayURL() + '/users/password', password, {headers: header})
      .subscribe((data) => {
        this.auth.currentUser = data;
      });
  }

  searchUsername(searchUsername: string): Promise<UserProfile[]> {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.get<UserProfile[]>(EnvironmentProvider.getGatewayURL() + '/users/search/' + searchUsername, {headers: header}).toPromise()
  }

  follow(id: number) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.post<any>(EnvironmentProvider.getGatewayURL() + '/users/follow/' + id, {}, {headers: header}).toPromise();
  }

  unfollow(id: number) {
    return this.follow(id);
  }

  getFollowing(id: number) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.get<UserProfile[]>(EnvironmentProvider.getGatewayURL() + '/users/followings/' + id, {headers: header}).toPromise()
  }

  getFollowers(id: number) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.get<UserProfile[]>(EnvironmentProvider.getGatewayURL() + '/users/followers/' + id, {headers: header}).toPromise()
  }

}
