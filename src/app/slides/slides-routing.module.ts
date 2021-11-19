import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SlidePage} from './slide.page';

const routes: Routes = [
  {
    path: '',
    component: SlidePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidesRoutingModule { }
