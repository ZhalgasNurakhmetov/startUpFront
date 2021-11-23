import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {IonicModule} from "@ionic/angular";
import {settingComponents} from "./index";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ...settingComponents,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class SettingModule { }
