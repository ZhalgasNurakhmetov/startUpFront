import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Mode} from '@ionic/core';
import {PlatformService} from '../../services/platform/platform.service';
import {ChatService} from '../../services/chat/chat.service';
import {Chat, Message} from '../../core/models/chat';
import {CurrentUserService} from '../../services/current-user/current-user.service';
import {MessageFormService} from './form/message.form.service';
import {WebSocketService} from '../../services/webSocket/web-socket.service';
import {IonContent} from '@ionic/angular';
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {UserRoutes} from "../user/user.routes";

@Component({
  templateUrl: './personal-chat.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalChatPage implements OnInit, OnDestroy {

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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUserId = this.currentUserService.getCurrentUserId();
    this.chat = this.chatService.getCurrentChat();
    this.isFirstUser = this.currentUserId === this.chat?.firstUserId;
    this.subscribeToMessage();
  }

  ionViewWillEnter() {
    this.content.scrollToBottom(0);
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

  navigateToContactPage(id: string): void {
    this.router.navigate([AppRoutes.user, UserRoutes.profile, id]);
  }

  private subscribeToMessage(): void {
    this.webSocketService.webSocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      const chatList = this.chatService.getChatListValue();
      if (message.chatId === this.chat.id) {
        message.isRed = true;
        this.chat.messages.push(message);
        this.content.scrollToBottom(0);
        const index = chatList.findIndex(ch => ch.id === this.chat.id);
        chatList.splice(index, 1, this.chat);
        this.webSocketService.readMessage(JSON.stringify({
          chatId: this.chat.id,
          userId: this.currentUserId,
          contactId: this.chat.firstUserId === this.currentUserId ? this.chat.secondUserId : this.chat.firstUserId
        }));
        this.cd.markForCheck();
      } else {
        this.chatService.setTotalUnreadMessages(this.chatService.getTotalUnreadMessagesValue() + 1);
        const index = chatList.findIndex(ch => ch?.id === message?.chatId);
        if (index > -1) {
          chatList[index].messages.push(message);
          chatList[index].unreadMessages = chatList[index].unreadMessages ? chatList[index].unreadMessages + 1 : 1;
          chatList.sort(this.chatService.chatListSorting);
        } else {
          const newChat: Chat = this.chatService.createNewChat(message, this.currentUserService.getCurrentUserValue());
          newChat.unreadMessages = 1;
          chatList.unshift(newChat);
        }
        this.chatService.setChatList(chatList);
      }
    };
  }

  ngOnDestroy(): void {
    this.chatService.setCurrentChat(null);
  }

}
