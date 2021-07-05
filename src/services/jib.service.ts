import {Injectable} from '@angular/core';
import {Jib} from "../model/Jib";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../model/User";
import {EnvironmentProvider} from "../environments/EnvironmentProvider";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class JibService {

  private allJibs: BehaviorSubject<Jib[]> = new BehaviorSubject<Jib[]>([]);
  allJibsObservable: Observable<Jib[]> = this.allJibs.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  async getAllJibs(): Promise<void> {
    if (!this.auth.currentToken){
      setTimeout(() => {
        this.getAllJibs();
      },5000);
    }else{
      const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
      this.http.get<any[]>(EnvironmentProvider.getGatewayURL() + '/post/getHomePosts', {headers: header})
        .subscribe((data: any[]) => {
          const jibs: Jib[] = [];
          data.forEach((jb) => {
            let jib: Jib;
            if (jb.media) {
              jib = new Jib(jb.id, jb.username, jb.userId, jb.content, jb.likes, jb.reposts, jb.threads, jb.date, jb.media);
            } else {
              jib = new Jib(jb.id, jb.username, jb.userId, jb.content, jb.likes, jb.reposts, jb.threads, jb.date);
            }
            jibs.push(jib);
          });
          this.setAllJibs(jibs);
        });
    }
  }

  private setAllJibs(jibs: Jib[]): void {
    this.allJibs.next(jibs);
  }

  publish(content: string) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    this.http.post<Jib>(EnvironmentProvider.getGatewayURL() + '/post/create', {content: content}, {headers: header})
      .subscribe(async (data) => {
        if (data) {
          const newJibs = this.allJibs.getValue();
          newJibs.push(data);
          this.setAllJibs(newJibs);
        }
      });
  }

  like(jib: Jib) {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    this.http.post<Jib>(EnvironmentProvider.getGatewayURL() + '/post/' + jib.id + '/like', {}, {headers: header})
      .subscribe(async (data) => {
      });
  }

  getUserJibs(user: User): Promise<Jib[]> {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.get<Jib[]>(EnvironmentProvider.getGatewayURL() + '/post/getAll/' + user.id, {headers: header}).toPromise();
  }

  async delete(jib: Jib): Promise<number> {
    const header: HttpHeaders = new HttpHeaders({'Authorization': this.auth.currentToken})
    return this.http.delete<number>(EnvironmentProvider.getGatewayURL() + '/post/delete/' + jib.id, {headers: header}).toPromise();
  }
}
