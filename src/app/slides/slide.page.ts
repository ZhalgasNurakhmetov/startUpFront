import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SwiperComponent} from 'swiper/angular';
import SwiperCore, {Pagination, SwiperOptions} from 'swiper';
import {PlatformService} from '../services/platform/platform.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../app.routes';
import {SingleTimeService} from '../services/single-time/single-time.service';
import {Mode} from "@ionic/core";
import {SplashScreen} from "@capacitor/splash-screen";
import {StatusBar} from "@capacitor/status-bar";


SwiperCore.use([Pagination]);

@Component({
  templateUrl: './slide.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlidePage implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
  };

  slideContent = [
    {
      imgUrl: 'assets/svg/slide_1_welcome.svg',
      text: 'Добро пожаловать на Bookberry!',
      last: false,
    },
    {
      imgUrl: 'assets/svg/slide_2_investigate.svg',
      text: 'Приступайте к поиску книг, которые вы хотите прочитать',
      last: false,
    },
    {
      imgUrl: 'assets/svg/slide_3_communicate.svg',
      text: 'Начните общение с владельцом и получите книгу',
      last: false,
    },
    {
      imgUrl: 'assets/svg/slide_4_reading.svg',
      text: 'Приятного чтения!',
      last: true,
    },
  ];

  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private singleTimeService: SingleTimeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    // StatusBar.hide();
    // SplashScreen.hide();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  navigateToLogin(): void {
    this.router.navigate([AppRoutes.login])
      .then(() => {
        this.singleTimeService.setIsNotFirstTime();
      });
  }

}
