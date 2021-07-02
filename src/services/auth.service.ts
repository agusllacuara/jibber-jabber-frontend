import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationService} from "./notification.service";
import {User} from "../model/User";
import {UserService} from "./user.service";
import {EnvironmentProvider} from "../environments/EnvironmentProvider";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser: User | undefined;

  private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedObserver: Observable<boolean> = this.logged.asObservable();
  currentToken: string = '';

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    const user = localStorage.getItem('jj-user');
    if (user) {
      const tkn = localStorage.getItem('jj-tkn');
      if (tkn) {
        this.currentUser = JSON.parse(user);
        const aux = tkn.split('"');
        this.currentToken = aux[1];
        this.logged.next(true);
        this.logged.next(true);
      }
    }
  }

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  async login(email: string, password: string) {
    this.http.post<any>(EnvironmentProvider.getGatewayURL() + '/authenticate', {
      email: email,
      password: password
    })
      .subscribe(
        (response) => {
          if (response) {
            this.currentToken = 'Bearer ' + response.token;
            this.currentUser = response.user;
            localStorage.setItem('jj-user', JSON.stringify(this.currentUser));
            localStorage.setItem('jj-tkn', JSON.stringify(this.currentToken));
            this.logged.next(true);
          }
        },
        (error) => {
          console.log(error)
          this.logged.next(false);
          this.loginErrorHandler(error);
        });

  }

  private loginErrorHandler(err: HttpErrorResponse): void {
    this.notificationService.notify('Login unsuccessful! Please try again.')
  }

  async createAccount(username: string, email: string, password: string): Promise<boolean> {
    try {
      const header = {headers: {contentType: "application/json"}}
      const register = await this.http.post<any>(EnvironmentProvider.getGatewayURL() + '/users/register', {
        username: username,
        email: email,
        password: password
      }, header).toPromise();
      this.notificationService.notify('Register successful! Login to continue.');
      return Promise.resolve(true);
    } catch (err) {
      console.log(err);
      this.notificationService.notify('Register unsuccessful. Please retry.');
      return Promise.reject(false);
    }
  }

  logout() {
    localStorage.removeItem('jj-user');
    localStorage.removeItem('jj-tkn');
    this.logged.next(false);
  }
}
