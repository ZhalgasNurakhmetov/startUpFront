import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FavoriteResourceRoutingModule} from './favorite-resource-routing.module';
import {IonicModule} from '@ionic/angular';
import {favoriteResourceComponents, favoriteResourceServices} from './index';


@NgModule({
  declarations: [
    ...favoriteResourceComponents,
  ],
  imports: [
    CommonModule,
    FavoriteResourceRoutingModule,
    IonicModule,
  ],
  providers: [
    ...favoriteResourceServices,
  ],
})
export class FavoriteResourceModule { }
