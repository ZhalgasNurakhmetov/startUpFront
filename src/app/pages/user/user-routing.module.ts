import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRoutes} from "./user.routes";

const routes: Routes = [
  {
    path: UserRoutes.profile,
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: UserRoutes.resources,
    loadChildren: () => import('./resource-list/resource-list.module').then(m => m.ResourceListModule),
  },
  {
    path: UserRoutes.contacts,
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
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
