import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import {ChatListPage} from "./chat-list.page";
import {IonicModule} from "@ionic/angular";
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [ChatListPage],
  imports: [
    CommonModule,
    ChatRoutingModule,
    IonicModule,
    ScrollingModule
  ]
})
export class ChatModule { }
