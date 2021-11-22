import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfilePage} from "./profile.page";
import {IonicModule} from "@ionic/angular";
import {ProfilePageGuard} from "./profile.page.guard";
import {ProfileApi} from "./api/profile.api";


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule
  ],
  providers: [
    ProfilePageGuard,
    ProfileApi,
  ],
})
export class ProfileModule { }
