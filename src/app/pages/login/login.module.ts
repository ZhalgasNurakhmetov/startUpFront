import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {IonicModule} from '@ionic/angular';
import {LoginPage} from "./login.page";
import {LoginFormService} from "./form/login.form.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginFormService,
  ],
})
export class LoginModule { }
