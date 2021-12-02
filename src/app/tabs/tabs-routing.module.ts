import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {TabRoutes} from "./tab.routes";
import {TabsGuard} from "./tabs.guard";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [TabsGuard],
    children: [
      {
        path: TabRoutes.profile,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: TabRoutes.resources,
        loadChildren: () => import('./resource-list/resource-list.module').then(m => m.ResourceListModule),
      },
      {
        path: TabRoutes.addResource,
        loadChildren: () => import('./resource-card/resource-card.module').then(m => m.ResourceCardModule),
      },
      {
        path: TabRoutes.search,
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
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
