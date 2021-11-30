import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceListRoutingModule } from './resource-list-routing.module';
import {ResourceListPage} from "./resource-list.page";
import {IonicModule} from "@ionic/angular";
import {ResourceListComponent} from "./resource-list/resource-list.component";


@NgModule({
  declarations: [
    ResourceListPage,
    ResourceListComponent,
  ],
  imports: [
    CommonModule,
    ResourceListRoutingModule,
    IonicModule
  ]
})
export class ResourceListModule { }
