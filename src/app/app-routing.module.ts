import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './app.routes';
import {SlidesPageGuard} from "./slides.page.guard";
import {TabsPageGuard} from "./tabs.page.guard";

const routes: Routes = [
  {
    path: AppRoutes.slides,
    loadChildren: () => import('./slides/slides.module').then(m => m.SlidesModule),
    canActivate: [SlidesPageGuard],
  },
  {
    path: AppRoutes.login,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: AppRoutes.registration,
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: AppRoutes.passwordRestore,
    loadChildren: () => import('./pages/password-restore/password-restore.module').then(m => m.PasswordRestoreModule),
  },
  {
    path: AppRoutes.tabs,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [TabsPageGuard],
  },
  {
    path: AppRoutes.favorites,
    loadChildren: () => import('./pages/favorite-resource/favorite-resource.module').then(m => m.FavoriteResourceModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.slides,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
