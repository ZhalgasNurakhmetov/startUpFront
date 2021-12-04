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

@Component({
  templateUrl: './chat-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListPage implements OnInit, OnDestroy {

  platform: Mode;
  chatList: Chat[];
  currentUserId: string;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private chatService: ChatService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUserId = this.currentUserService.getCurrentUserId();
    this.subscribeToChatList();
  }

  setCurrentChat(chat: Chat): void {
    this.chatService.setCurrentChat(chat);
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
