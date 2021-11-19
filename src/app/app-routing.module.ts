import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './app.routes';

const routes: Routes = [
  {
    path: AppRoutes.slides,
    loadChildren: () => import('./slides/slides.module').then(m => m.SlidesModule),
  },
  {
    path: AppRoutes.login,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.slides,
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
