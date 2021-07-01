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

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private allChats: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  allChatsObservable: Observable<Chat[]> = this.allChats.asObservable();

  constructor(
    private http: HttpClient,
    private wsService: SocketService,
    private auth: AuthService,
    private notificationService: NotificationService,
    private userService: UserService) {
  }

  subscribeToChatReceiverSocket() {
    this.wsService.subscribe(
      `/chats/${this.userService.getCurrentUser()?.id}`,
      (msg: any) => {
        if (msg) {
          const currentChat = this.allChats.getValue();
          const chat = currentChat.find(x => x.chatId == msg.id);
          if (chat) {
            const message = new ChatMessageDTO(msg.id, msg.sender, msg.receiver, msg.content);
            chat.messages.push(message);
            const sendersName = chat.user1.id == msg.sender ? chat.user1.name : chat.user2.name;
            this.notificationService.notify('New Message from!' + sendersName);
          } else {
            this.getSpecificChat(msg.id).then((incomingChat) => {
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
    currentChats.push(
      new Chat(
        0,
        new UserWithUsername(usersProfile.id, usersProfile.username),
        new UserWithUsername(this.userService.getCurrentUser()!.id, this.userService.getCurrentUser()!.username),
        []));
  }
}
