import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import {ContactPage} from "./contact.page";
import {IonicModule} from "@ionic/angular";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    ContactPage,
    ContactListComponent,
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        IonicModule,
        ScrollingModule
    ]
})
export class ContactModule { }
