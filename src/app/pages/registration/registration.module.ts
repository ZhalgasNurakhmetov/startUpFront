import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import {RegistrationPage} from "./registration.page";
import {registrationServices} from "./index";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    ...registrationServices,
  ],
})
export class RegistrationModule { }
