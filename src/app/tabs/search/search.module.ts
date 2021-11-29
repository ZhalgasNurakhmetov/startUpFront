import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {SearchPage} from "./search.page";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchApi} from "./api/search.api";
import {FilterModal} from "./modals/filter/filter.modal";
import {SearchFilterFormService} from "./form/search-filter.form.service";


@NgModule({
  declarations: [
    SearchPage,
    FilterModal,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
    SearchApi,
    SearchFilterFormService,
  ],
})
export class SearchModule { }
