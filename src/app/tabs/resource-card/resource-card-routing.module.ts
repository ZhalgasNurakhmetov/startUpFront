import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourceCardPage} from "./resource-card.page";

const routes: Routes = [
  {
    path: '',
    component: ResourceCardPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceCardRoutingModule { }
