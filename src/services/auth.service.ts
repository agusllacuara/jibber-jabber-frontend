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

  login(username: string, password: string) {
    // this.http.post<any>('http://localhost:8080/login', {username: username, password: password})
    //   .subscribe(
    //     (response: any) => {
    //       if (response && response.status == '200') {
    //         this.logged.next(true);
    //       }
    //     },
    //     (error) => {
    //       this.logged.next(false);
    //       this.loginErrorHandler(error);
    //     });

    // const user = this.mockLogin(username, password);
    const user = this.accounts[0];
    if (user) {
      this.userService.setCurrentUser(user);
      this.logged.next(true)
    }

  }

  private loginErrorHandler(err: HttpErrorResponse): void {
    this.notificationService.notify('Login unsuccessful! Please try again.')
  }

  async createAccount(username: string, email: string, password: string): Promise<boolean> {
    // try {
    //   const register = await this.http.post<any>('http://localhost:8080/register', {}).toPromise();
    //   this.notificationService.notify('Register successful! Login to continue.');
    //   return Promise.resolve(true);
    // } catch (err) {
    //   console.log(err);
    //   this.notificationService.notify('Register unsuccessful. Please retry.');
    //   return Promise.reject(false);
    // }

    this.addUserToMock(new User(+password, username, email));
    console.log(this.accounts)
    return Promise.resolve(true);
  }

  private addUserToMock(user: User) {
    this.accounts.push(user);
  }

  private mockLogin(mail: string, password: string): User | null {
    const results = this.accounts.filter(x => (x.id == +password) && (x.email == mail));
    if (results) return results[0];
    else return null;
  }

  logout() {
    this.logged.next(false);
  }
}
