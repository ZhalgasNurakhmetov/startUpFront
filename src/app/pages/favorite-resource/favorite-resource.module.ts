import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FavoriteResourceRoutingModule} from './favorite-resource-routing.module';
import {IonicModule} from '@ionic/angular';
import {favoriteResourceComponents, favoriteResourceServices} from './index';
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    ...favoriteResourceComponents,
  ],
    imports: [
        CommonModule,
        FavoriteResourceRoutingModule,
        IonicModule,
        ScrollingModule,
    ],
  providers: [
    ...favoriteResourceServices,
  ],
})
export class FavoriteResourceModule { }
