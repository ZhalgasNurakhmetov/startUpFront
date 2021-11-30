import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ResourceViewModal} from "./components/resource-view/resource-view.modal";
import {UserApi} from "./api/user.api";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    ResourceViewModal,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule
  ],
  providers: [
    UserApi,
  ]
})
export class UserModule { }
