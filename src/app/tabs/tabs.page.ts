import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../services/platform/platform.service";
import {TabsApi} from "./api/tabs.api";
import {ChatService} from "../services/chat/chat.service";
import {take} from "rxjs/operators";

@Component({
  templateUrl: 'tabs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage implements OnInit{

  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private tabsApi: TabsApi,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.getChatList();
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

}
