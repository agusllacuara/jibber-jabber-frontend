import {Injectable} from '@angular/core';
import {Jib} from "../model/Jib";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../model/User";

@Injectable({
  providedIn: 'root',
})
export class JibService {

  private allJibs: BehaviorSubject<Jib[]> = new BehaviorSubject<Jib[]>([]);
  allJibsObservable: Observable<Jib[]> = this.allJibs.asObservable();

  constructor(private http: HttpClient) {
  }

  async getAllJibs(): Promise<void> {
    this.http.get<any[]>('http://localhost:8080/post/getAll')
      .subscribe((data: any[]) => {
        const jibs: Jib[] = [];
        data.forEach((jb) => {
          console.log(jb.user_info)
          let jib: Jib;
          if (jb.media) {
            jib = new Jib(jb.id, jb.user_info, jb.content, jb.likes, jb.reposts, jb.threads, jb.date, jb.media);
          } else {
            jib = new Jib(jb.id, jb.user_info, jb.content, jb.likes, jb.reposts, jb.threads, jb.date);
          }
          jibs.push(jib);
        });
        this.setAllJibs(jibs);
      });
  }

  private setAllJibs(jibs: Jib[]): void {
    this.allJibs.next(jibs);
  }

  publish(content: string) {
    this.http.post<Jib>('http://localhost:8080/post/create', {content: content})
      .subscribe(async (data) => {
        if (data) {
          const newJibs = this.allJibs.getValue();
          newJibs.push(data);
          this.setAllJibs(newJibs);
        }
      });
  }

  like(jib: Jib) {
    this.http.post<Jib>('http://localhost:8080/post/like', {jib: jib.id})
      .subscribe(async (data) => {
      });
  }

  getUserJibs(user: User) {
    // return this.http.get<Jib[]>('http://localhost:8080/post/getAll/' + user.id).toPromise();
    return Promise.resolve([new Jib(1, 'NickyFox', 'jb.content', ['1'], ['jb.reposts'], [], '', undefined)]);
  }

  async delete(jib: Jib): Promise<number> {
    return this.http.delete<number>('http://localhost:8080/post/' + jib.id).toPromise();
  }
}
