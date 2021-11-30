import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourceListPage} from "./resource-list.page";

const routes: Routes = [
  {
    path: '',
    component: ResourceListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceListRoutingModule { }
