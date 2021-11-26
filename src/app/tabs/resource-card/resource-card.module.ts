import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceCardRoutingModule } from './resource-card-routing.module';
import {ResourceCardPage} from "./resource-card.page";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    ResourceCardPage,
  ],
  imports: [
    CommonModule,
    ResourceCardRoutingModule,
    IonicModule
  ]
})
export class ResourceCardModule { }
