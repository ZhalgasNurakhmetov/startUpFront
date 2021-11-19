import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SlidesRoutingModule} from './slides-routing.module';
import {SwiperModule} from 'swiper/angular';
import {IonicModule} from '@ionic/angular';
import {SlidePage} from "./slide.page";


@NgModule({
  declarations: [
    SlidePage,
  ],
  imports: [
    CommonModule,
    SlidesRoutingModule,
    SwiperModule,
    IonicModule,
  ],
})
export class SlidesModule { }
