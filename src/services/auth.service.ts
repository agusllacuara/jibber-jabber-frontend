import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationService} from "./notification.service";
import {User} from "../model/User";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private accounts: User[] = [new User(12345678,'agusllacuara','agus@gmail.com')];

  private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedObserver: Observable<boolean> = this.logged.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService,
              private userService: UserService) {
  }

  login(email: string, password: string) {
    this.http.post<any>('http://localhost:8081/login', {email: email, password: password})
      .subscribe(
        (response: any) => {
          if (response && response.status == '200') {
            this.logged.next(true);
          }
        },
        (error) => {
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
      const register = await this.http.post<any>('http://localhost:8081/users/register', {username: username, email: email, password: password}, header).toPromise();
      this.notificationService.notify('Register successful! Login to continue.');
      return Promise.resolve(true);
    } catch (err) {
      console.log(err);
      this.notificationService.notify('Register unsuccessful. Please retry.');
      return Promise.reject(false);
    }
  }

  logout() {
    this.logged.next(false);
  }
}
