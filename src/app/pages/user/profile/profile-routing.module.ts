import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePage} from "./profile.page";
import {ProfilePageGuard} from "./profile.guard";

const routes: Routes = [
  {
    path: ':id',
    component: ProfilePage,
    canActivate: [ProfilePageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
