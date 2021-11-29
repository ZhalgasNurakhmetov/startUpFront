import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfilePage} from "./profile.page";
import {ProfileApi} from "./api/profile.api";
import {ProfilePageGuard} from "./profile.guard";
import {IonicModule} from "@ionic/angular";
import {ResourceListComponent} from "./content/resource-list/resource-list.component";


@NgModule({
  declarations: [
    ProfilePage,
    ResourceListComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule
  ],
  providers: [
    ProfileApi,
    ProfilePageGuard,
  ]
})
export class ProfileModule { }
