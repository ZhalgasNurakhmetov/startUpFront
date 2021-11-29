import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRoutes} from "./user.routes";

const routes: Routes = [
  {
    path: UserRoutes.profile,
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: UserRoutes.profile,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
