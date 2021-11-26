import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceCreateRoutingModule } from './resource-create-routing.module';
import {ResourceCreatePage} from "./resource-create.page";
import {IonicModule} from "@ionic/angular";
import {ResourceCreateFormService} from "./form/resource-create.form.service";
import {ReactiveFormsModule} from "@angular/forms";
import {ResourceCreateApi} from "./api/resource-create.api";


@NgModule({
  declarations: [
    ResourceCreatePage,
  ],
  imports: [
    CommonModule,
    ResourceCreateRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
    ResourceCreateFormService,
    ResourceCreateApi,
  ],
})
export class ResourceCreateModule { }
