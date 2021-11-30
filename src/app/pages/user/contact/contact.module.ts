import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import {ContactPage} from "./contact.page";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    ContactPage,
    ContactListComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    IonicModule
  ]
})
export class ContactModule { }