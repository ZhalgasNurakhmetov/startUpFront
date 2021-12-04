import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalChatRoutingModule } from './personal-chat-routing.module';
import {PersonalChatPage} from "./personal-chat.page";
import {IonicModule} from "@ionic/angular";
import {MessageFormService} from "./form/message.form.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PersonalChatPage,
  ],
  imports: [
    CommonModule,
    PersonalChatRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageFormService,
  ]
})
export class PersonalChatModule { }
