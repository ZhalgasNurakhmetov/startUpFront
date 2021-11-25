import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceListRoutingModule } from './resource-list-routing.module';
import {ResourceListPage} from "./resource-list.page";
import {IonicModule} from "@ionic/angular";
import {ResourceListPageGuard} from "./resource-list.page.guard";
import {ResourceListComponent} from "./resource-list/resource-list.component";
import {ResourceListApi} from "./api/resource-list.api";
import {resourceListModalComponents} from "./modals";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ResourceListPage,
    ResourceListComponent,
    ...resourceListModalComponents,
  ],
    imports: [
        CommonModule,
        ResourceListRoutingModule,
        IonicModule,
        ReactiveFormsModule,
    ],
  providers: [
    ResourceListPageGuard,
    ResourceListApi,
  ]
})
export class ResourceListModule { }
