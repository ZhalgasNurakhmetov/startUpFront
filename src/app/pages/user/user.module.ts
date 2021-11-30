import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ResourceViewModal} from "./components/resource-view/resource-view.modal";
import {UserApi} from "./api/user.api";


@NgModule({
  declarations: [
    ResourceViewModal,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    UserApi,
  ]
})
export class UserModule { }
