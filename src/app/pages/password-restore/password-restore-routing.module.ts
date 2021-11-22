import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PasswordRestorePage} from "./password-restore.page";

const routes: Routes = [
  {
    path: '',
    component: PasswordRestorePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRestoreRoutingModule { }
