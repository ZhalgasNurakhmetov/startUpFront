import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../services/platform/platform.service";
import {TabsApi} from "./api/tabs.api";
import {ChatService} from "../services/chat/chat.service";
import {take} from "rxjs/operators";
import {Chat, Message} from "../core/models/chat";
import {WebSocketService} from "../services/webSocket/web-socket.service";
import {CurrentUserService} from "../services/current-user/current-user.service";
import {User} from "../core/models/user";
import {Network} from "@capacitor/network";
import {StatusBar} from "@capacitor/status-bar";
import {SplashScreen} from "@capacitor/splash-screen";

@Component({
  templateUrl: 'tabs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage implements OnInit, OnDestroy{

  // TODO unred message count badges

  platform: Mode;
  currentUser: User;
  isConnected = true;

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
    this.subscribeToMessage();
    this.checkNetworkConnection();
    StatusBar.hide();
    SplashScreen.hide();
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
        this.chatService.setChatList(chatList);
      });
  }

  private subscribeToMessage(): void {
    this.webSocketService.webSocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      const chatList: Chat[] = this.chatService.getChatListValue();
      const index = chatList.findIndex(chat => chat?.id === message.chatId);
      if (index > -1) {
        chatList[index].messages.push(message);
      } else {
        const newChat: Chat = this.createNewChat(message);
        chatList.push(newChat);
      }
      this.chatService.setChatList(chatList);
    };
  }

  private createNewChat(message: Message): Chat {
    return {
      id: message.chatId,
      firstUserId: message.userId,
      secondUserId: this.currentUser.id,
      firstUserInfo: `${message.userInfo.firstName} ${message.userInfo.lastName}`,
      secondUserInfo: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      firstUserPhoto: message.userInfo.photo,
      secondUserPhoto: this.currentUser.photo,
      messages: [message]
    };
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }

}
