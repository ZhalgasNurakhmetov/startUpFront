import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourceCreatePage} from "./resource-create.page";

const routes: Routes = [
  {
    path: ':isPersonal',
    component: ResourceCreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceCreateRoutingModule { }
