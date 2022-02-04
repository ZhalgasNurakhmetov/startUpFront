import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceListRoutingModule } from './resource-list-routing.module';
import {ResourceListPage} from "./resource-list.page";
import {IonicModule} from "@ionic/angular";
import {ResourceListComponent} from "./resource-list/resource-list.component";
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    ResourceListPage,
    ResourceListComponent,
  ],
    imports: [
        CommonModule,
        ResourceListRoutingModule,
        IonicModule,
        ScrollingModule
    ]
})
export class ResourceListModule { }
