import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Mode} from '@ionic/core';
import {PlatformService} from '../../services/platform/platform.service';
import {ChatService} from '../../services/chat/chat.service';
import {Chat, Message} from '../../core/models/chat';
import {Subject} from 'rxjs';
import {CurrentUserService} from '../../services/current-user/current-user.service';
import {MessageFormService} from './form/message.form.service';
import {WebSocketService} from '../../services/webSocket/web-socket.service';
import {IonContent} from '@ionic/angular';

@Component({
  templateUrl: './personal-chat.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalChatPage implements OnInit, AfterViewInit, OnDestroy {

  // TODO message list resets (reloads) on every new message
  // TODO message list does not scroll to bottom
  // TODO too long messages gets truncated

  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;

  platform: Mode;
  chat: Chat;
  isFirstUser: boolean;
  currentUserId: string;
  form = this.messageFormService.initMessageForm();

  personalStyles = {
    width: '15rem',
    position: 'absolute',
    left: 'auto !important',
    'margin-right': '16px'
  };

  contactStyles = {
    width: '15rem',
    'margin-left': '16px'
  };

  constructor(
    private platformService: PlatformService,
    private chatService: ChatService,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
    private messageFormService: MessageFormService,
    private webSocketService: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUserId = this.currentUserService.getCurrentUserId();
    this.chat = this.chatService.getCurrentChat();
    this.isFirstUser = this.currentUserId === this.chat?.firstUserId;
    this.subscribeToMessage();
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
  }

  ngAfterViewInit(): void {

  }

  trackById(index, { id }: Message): string {
    return id;
  }

  sendMessage(): void {
    this.form.patchValue({
      chatId: this.chat.id,
      userId: this.currentUserId,
      isRed: false,
      dateTime: new Date().toISOString(),
      contactId: this.isFirstUser ? this.chat.secondUserId : this.chat.firstUserId
    });
    this.webSocketService.sendMessage(JSON.stringify(this.form.value));
    this.form.reset();
  }

  scrollDown(): void {

  }

  private subscribeToMessage(): void {
    this.webSocketService.webSocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      if (message.chatId === this.chat.id) {
        this.chat.messages.push(message);
        this.cd.markForCheck();
        this.content.scrollToBottom(0);
      }
    };
  }

  ngOnDestroy(): void {
    this.chatService.setCurrentChat(null);
  }

}
