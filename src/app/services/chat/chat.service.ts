import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Chat} from "../../core/models/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatList$ = new BehaviorSubject<Chat[]>(null);

  setChatList(chatList: Chat[]): void {
    this.chatList$.next(chatList);
  }

  getChatList(): Observable<Chat[]> {
    return this.chatList$;
  }
}
