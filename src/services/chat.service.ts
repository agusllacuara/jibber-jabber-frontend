import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentProvider} from "../environments/EnvironmentProvider";
import {SocketService} from "./socket.service";
import {AuthService} from "./auth.service";
import {NotificationService} from "./notification.service";
import {UserService} from "./user.service";
import {Chat, ChatMessageDTO, UserWithUsername} from "../model/Message";
import {UserProfile} from "../model/User";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private allChats: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  allChatsObservable: Observable<Chat[]> = this.allChats.asObservable();

  private openChatEvent: BehaviorSubject<Chat | undefined> = new BehaviorSubject<Chat | undefined>(undefined);
  openChatEventObservable: Observable<Chat | undefined> = this.openChatEvent.asObservable();

  constructor(
    private http: HttpClient,
    private wsService: SocketService,
    private auth: AuthService,
    private notificationService: NotificationService,
    private userService: UserService) {
  }

  subscribeToChatReceiverSocket() {
    this.wsService.subscribe(
      `/topic/messages/${this.userService.getCurrentUser()!.id}`,
      (msgUnparsed: any) => {
        const msg = JSON.parse(msgUnparsed.body);
        if (msg) {
          const currentAllChats = this.allChats.getValue();
          const chat = currentAllChats.find(x => x.chatId == msg.id);
          if (chat) {
            const message = new ChatMessageDTO(msg.id, msg.sender, msg.receiver, msg.content);
            chat.messages.push(message);
            this.allChats.next(this.allChats.value);
            const sendersName = chat.user1.id == msg.sender ? chat.user1.username : chat.user2.username;
            this.notificationService.notify('New message from: ' + sendersName);
          } else {
            this.getSpecificChat(msg.id)
              .then((incomingChat) => {
                const sendMe: Chat[] = {...this.allChats.getValue()};
                sendMe.push(incomingChat);
                this.allChats.next(sendMe);
              });
            this.notificationService.notify('New chat available!');
          }
        } else {
          console.log("Received null message");
        }
      });
  }

  sendMessage(msg: ChatMessageDTO) {
    this.wsService.sendMessage(msg);
  }

  getChats() {
    const header = {headers: new HttpHeaders().set('Authorization', this.auth.currentToken)}
    this.http.get<Chat[]>(EnvironmentProvider.getGatewayURL() + '/chat/all', header)
      .toPromise()
      .then((res) => {
        if (res) {
          this.allChats.next(res);
        } else this.notificationService.notify('Error while getting messages');
      }).catch(err => {
      this.notificationService.notify('Error while getting messages')
    });
  }

  getSpecificChat(chatId: number): Promise<Chat> {
    const header = {headers: new HttpHeaders().set('Authorization', this.auth.currentToken)}
    return this.http.get<Chat>(EnvironmentProvider.getGatewayURL() + '/chat/' + chatId, header)
      .toPromise()
  }

  createChat(usersProfile: UserProfile) {
    const currentChats = this.allChats.getValue();
    const currentUser = this.userService.getCurrentUser();
    if (currentUser){
      const userId = currentUser.id;
      const toId = usersProfile.id;
      const chat = currentChats.find(x => this.exists(x, userId, toId))
      if(chat){
        this.openChatEvent.next(chat);
      }else{
        const newChat =
          new Chat(
            0,
            new UserWithUsername(usersProfile.id, usersProfile.username),
            new UserWithUsername(this.userService.getCurrentUser()!.id, this.userService.getCurrentUser()!.username),
            []);
        currentChats.push(newChat);
        this.openChatEvent.next(newChat);
      }
    }
  }

  private exists(x: Chat, userId: number, toId: number) {
    return (x.user1.id == userId && x.user2.id == toId) || (x.user2.id == userId && x.user1.id == toId);
  }
}
