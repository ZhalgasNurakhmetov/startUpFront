import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourceListPage} from "./resource-list.page";
import {ResourceListPageGuard} from "./resource-list.page.guard";

const routes: Routes = [
  {
    path: '',
    component: ResourceListPage,
    canActivate: [ResourceListPageGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceListRoutingModule { }
