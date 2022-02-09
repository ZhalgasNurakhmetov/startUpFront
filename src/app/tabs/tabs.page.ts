import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../services/platform/platform.service";
import {TabsApi} from "./api/tabs.api";
import {ChatService} from "../services/chat/chat.service";
import {take, takeUntil} from "rxjs/operators";
import {Chat, Message} from "../core/models/chat";
import {WebSocketService} from "../services/webSocket/web-socket.service";
import {CurrentUserService} from "../services/current-user/current-user.service";
import {User} from "../core/models/user";
import {Network} from "@capacitor/network";
import {StatusBar} from "@capacitor/status-bar";
import {SplashScreen} from "@capacitor/splash-screen";
import {LocalNotifications} from "@capacitor/local-notifications";
import {Subject} from "rxjs";

@Component({
  templateUrl: 'tabs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage implements OnInit, OnDestroy{

  platform: Mode;
  currentUser: User;
  isConnected = true;
  totalUnreadMessages: number;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private tabsApi: TabsApi,
    private chatService: ChatService,
    private webSocketService: WebSocketService,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUser = this.currentUserService.getCurrentUserValue();
    this.getChatList();
    this.subscribeToTotalUnreadMessages();
    this.subscribeToMessage();
    this.checkNetworkConnection();
    this.subscribeToReadMessages();
    // StatusBar.hide();
    // SplashScreen.hide();
  }

  checkNetworkConnection() {
    Network.addListener('networkStatusChange', status => {
      this.isConnected = status.connected;
      this.cd.markForCheck();
    });
  }

  private getChatList(): void {
    this.tabsApi.getChatList()
      .pipe(
        take(1),
      )
      .subscribe(chatList => {
        const sortedList = chatList.sort(this.chatService.chatListSorting);
        const calculatedResult = this.calculateUnreadMessages(sortedList);
        this.chatService.setChatList(calculatedResult);
      });
  }

  private calculateUnreadMessages(chatList: Chat[]): Chat[]{
    let unreadMessages = 0;
    chatList.forEach(chat => {
      chat.messages.forEach(message => {
        if (message.userId !== this.currentUser.id && !message.isRed) {
          unreadMessages += 1;
          chat.unreadMessages = chat.unreadMessages ? chat.unreadMessages + 1 : 1;
        }
      });
    });
    this.chatService.setTotalUnreadMessages(unreadMessages);
    return chatList;
  }

  private subscribeToMessage(): void {
    this.webSocketService.webSocket.onmessage = (event) => {
      this.chatService.setTotalUnreadMessages(this.chatService.getTotalUnreadMessagesValue() + 1);
      const message: Message = JSON.parse(event.data);
      const chatList: Chat[] = this.chatService.getChatListValue();
      const index = chatList.findIndex(chat => chat?.id === message.chatId);
      if (index > -1) {
        chatList[index].messages.push(message);
        chatList[index].unreadMessages = chatList[index].unreadMessages ? chatList[index].unreadMessages + 1 : 1;
        chatList.sort(this.chatService.chatListSorting);
      } else {
        const newChat: Chat = this.chatService.createNewChat(message, this.currentUser);
        newChat.unreadMessages = 1;
        chatList.unshift(newChat);
      }
      this.chatService.setChatList(chatList);
      if (message.userId !== this.currentUser.id) {
        LocalNotifications.schedule({
          notifications: [
            {
              id: 3,
              title: `${message?.userInfo?.firstName} ${message?.userInfo?.lastName}`,
              body: message?.message,
              autoCancel: true,
              channelId: 'chatChannel',
              schedule: {
                allowWhileIdle: true,
              },
              actionTypeId: 'CHAT_MESSAGE'
            },
          ],
        });
      }
    };
  }

  private subscribeToReadMessages(): void {
    this.webSocketService.readMessageWebsocket.onmessage = (event) => {
      this.tabsApi.getChatList()
        .pipe(
          take(1),
        )
        .subscribe(chatList => {
          const sortedList = chatList.sort(this.chatService.chatListSorting);
          const calculatedResult = this.calculateUnreadMessages(sortedList);
          this.chatService.setChatList(calculatedResult);
          const currentChat = this.chatService.getCurrentChat();
          if (currentChat) {
            const chat = this.chatService.getChatListValue().find(c => c.id === currentChat.id);
            this.chatService.setCurrentChat(chat);
          }
        });
    };
  }

  private subscribeToTotalUnreadMessages(): void {
    this.chatService.getTotalUnreadMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(totalUnreadMessages => {
        this.totalUnreadMessages = totalUnreadMessages;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }

}
