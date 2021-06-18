import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Jib} from "../model/Jib";
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";

export class JibbyMessage {
  constructor(public sender: User, public datetime: Date, public content: string) {
  }
}

export class Chat {
  constructor(public friend: User, public messages: JibbyMessage[]) {
  }

}

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private allChats: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  allChatsObservable: Observable<Chat[]> = this.allChats.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<Chat[]>('http://localhost:8080/chats')
      .subscribe((chat) => {
        this.allChats.next(chat);
      })
  }


  createChat(userId: number) {
    return this.http.post('http://localhost:8080/chat/create', userId)
      .toPromise()
  }

  getChats() {
    const user1 = new User(1, 'agus', 'agus@gmail.com');
    const user2 = new User(2, 'notAgus', '');
    const user3 = new User(3, 'other', '');
    const chat = new Chat(
      user1,
      [
        new JibbyMessage(user2, new Date(), 'Hola'),
        new JibbyMessage(user1, new Date(), 'Hola'),
        new JibbyMessage(user1, new Date(), 'Que onda?')
      ]
    );
    const chat2 = new Chat(
      user1,
      [
        new JibbyMessage(user1, new Date(), 'Hola'),
        new JibbyMessage(user2, new Date(), 'Hola'),
        new JibbyMessage(user1, new Date(), 'Que onda?')
      ]
    );
    this.allChats.next([chat, chat2]);
  }
}
