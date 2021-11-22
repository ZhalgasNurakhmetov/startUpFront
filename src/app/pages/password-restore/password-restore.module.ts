import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRestoreRoutingModule } from './password-restore-routing.module';
import {PasswordRestorePage} from "./password-restore.page";
import {IonicModule} from "@ionic/angular";
import {passwordRestoreServices} from "./index";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PasswordRestorePage,
  ],
  imports: [
    CommonModule,
    PasswordRestoreRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
    ...passwordRestoreServices,
  ],
})
export class PasswordRestoreModule { }
