import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {loginComponents} from './index';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [
    ...loginComponents,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicModule,
  ]
})
export class LoginModule { }
