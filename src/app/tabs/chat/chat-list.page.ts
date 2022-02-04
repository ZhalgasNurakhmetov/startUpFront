import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {Mode} from '@ionic/core';
import {Chat} from '../../core/models/chat';
import {CurrentUserService} from '../../services/current-user/current-user.service';
import {ChatService} from '../../services/chat/chat.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppRoutes} from '../../app.routes';
import {environment} from "../../../environments/environment";
import {WebSocketService} from "../../services/webSocket/web-socket.service";

@Component({
  templateUrl: './chat-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListPage implements OnInit, OnDestroy {

  platform: Mode;
  chatList: Chat[];
  currentUserId: string;

  apiUrl = environment.apiUrl;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private chatService: ChatService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private webSocketService: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUserId = this.currentUserService.getCurrentUserId();
    this.subscribeToChatList();
  }

  setCurrentChat(chat: Chat, index: number): void {
    this.webSocketService.readMessage(JSON.stringify({
      chatId: chat.id,
      userId: this.currentUserId,
      contactId: chat.firstUserId === this.currentUserId ? chat.secondUserId : chat.firstUserId
    }));
    this.chatList[index].messages.forEach(message => {
      if (message.userId !== this.currentUserId) {
        message.isRed = true;
      }
    });
    this.chatService.setCurrentChat(this.chatList[index]);
    this.chatService.setChatList(this.chatList);
    this.router.navigate([AppRoutes.personalChat]);
  }

  trackById(index, { id }: Chat): string {
    return id;
  }

  private subscribeToChatList(): void {
    this.chatService.getChatList()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(chatList => {
        this.chatList = chatList;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
