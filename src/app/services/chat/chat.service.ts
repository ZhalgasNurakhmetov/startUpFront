import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Chat, Message} from "../../core/models/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatList$ = new BehaviorSubject<Chat[]>(null);
  private currentChat$ = new BehaviorSubject<Chat>(null);

  setChatList(chatList: Chat[]): void {
    this.chatList$.next(chatList);
  }

  setCurrentChat(chat: Chat): void {
    this.currentChat$.next(chat);
  }

  getChatList(): Observable<Chat[]> {
    return this.chatList$;
  }

  getCurrentChat(): Chat {
    return this.currentChat$.value;
  }

  getChatListValue(): Chat[] {
    return this.chatList$.value;
  }
}
