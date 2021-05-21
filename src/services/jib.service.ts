import {Injectable} from '@angular/core';
import {Jib} from "../model/Jib";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

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
}
