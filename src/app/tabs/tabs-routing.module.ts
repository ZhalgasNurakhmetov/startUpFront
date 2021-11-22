import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {TabRoutes} from "./tab.routes";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: TabRoutes.profile,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: TabRoutes.profile,
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
