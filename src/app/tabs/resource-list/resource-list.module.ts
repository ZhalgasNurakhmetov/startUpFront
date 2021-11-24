import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceListRoutingModule } from './resource-list-routing.module';
import {ResourceListPage} from "./resource-list.page";
import {IonicModule} from "@ionic/angular";
import {ResourceListPageGuard} from "./resource-list.page.guard";
import {ResourceListComponent} from "./resource-list/resource-list.component";
import {ResourceListApi} from "./api/resource-list.api";


@NgModule({
  declarations: [
    ResourceListPage,
    ResourceListComponent,
  ],
  imports: [
    CommonModule,
    ResourceListRoutingModule,
    IonicModule,
  ],
  providers: [
    ResourceListPageGuard,
    ResourceListApi,
  ]
})
export class ResourceListModule { }
