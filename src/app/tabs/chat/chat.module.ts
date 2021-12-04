import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import {ChatListPage} from "./chat-list.page";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [ChatListPage],
  imports: [
    CommonModule,
    ChatRoutingModule,
    IonicModule
  ]
})
export class ChatModule { }
