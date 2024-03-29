import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './app.routes';
import {SlidesPageGuard} from "./slides.page.guard";
import {AuthenticatedGuard} from "./authenticated.guard";

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
    canActivate: [AuthenticatedGuard],
  },
  {
    path: AppRoutes.favorites,
    loadChildren: () => import('./pages/favorite-resource/favorite-resource.module').then(m => m.FavoriteResourceModule),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: AppRoutes.setting,
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: AppRoutes.contact,
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: AppRoutes.resourceCreate,
    loadChildren: () => import('./pages/resource-create/resource-create.module').then(m => m.ResourceCreateModule),
  },
  {
    path: AppRoutes.user,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },
  {
    path: AppRoutes.personalChat,
    loadChildren: () => import('./pages/personal-chat/personal-chat.module').then(m => m.PersonalChatModule),
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
