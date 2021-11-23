import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoriteResourcePage} from "./favorite-resource.page";

const routes: Routes = [
  {
    path: '',
    component: FavoriteResourcePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteResourceRoutingModule { }
