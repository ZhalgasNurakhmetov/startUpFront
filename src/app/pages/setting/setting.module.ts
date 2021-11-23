import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {IonicModule} from "@ionic/angular";
import {settingComponents, settingServices} from "./index";


@NgModule({
  declarations: [
    ...settingComponents,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    IonicModule,
  ],
  providers: [
    ...settingServices,
  ],
})
export class SettingModule { }
