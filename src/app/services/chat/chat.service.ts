import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Chat, Message} from "../../core/models/chat";
import {User} from "../../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private totalUnreadMessages$ = new BehaviorSubject<number>(null);
  private chatList$ = new BehaviorSubject<Chat[]>(null);
  private currentChat$ = new BehaviorSubject<Chat>(null);

  setChatList(chatList: Chat[]): void {
    this.chatList$.next(chatList);
  }

  setCurrentChat(chat: Chat): void {
    this.currentChat$.next(chat);
  }

  setTotalUnreadMessages(totalUnreadMessages: number): void {
    this.totalUnreadMessages$.next(totalUnreadMessages);
  }

  getChatList(): Observable<Chat[]> {
    return this.chatList$;
  }

  getCurrentChat(): Chat {
    return this.currentChat$.value;
  }

  getTotalUnreadMessages(): Observable<number> {
    return this.totalUnreadMessages$;
  }

  getTotalUnreadMessagesValue(): number {
    return this.totalUnreadMessages$.value;
  }

  getChatListValue(): Chat[] {
    return this.chatList$.value;
  }

  createNewChat(message: Message, currentUser: User): Chat {
    return {
      id: message.chatId,
      firstUserId: message.userId,
      secondUserId: currentUser.id,
      firstUserInfo: `${message.userInfo.firstName} ${message.userInfo.lastName}`,
      secondUserInfo: `${currentUser.firstName} ${currentUser.lastName}`,
      firstUserPhotoPath: message.userInfo.photoPath,
      secondUserPhotoPath: currentUser.photoPath,
      messages: [message]
    };
  }

  chatListSorting(a: Chat, b: Chat) {
    if (a.messages[a.messages.length - 1].dateTime > b.messages[b.messages.length - 1].dateTime) {
      return 1;
    }
    if (a.messages[a.messages.length - 1].dateTime < b.messages[b.messages.length - 1].dateTime) {
      return  -1;
    }
  }
}
