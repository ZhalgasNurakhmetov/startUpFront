import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SwiperComponent} from 'swiper/angular';
import SwiperCore, {Pagination, SwiperOptions} from 'swiper';
import {PlatformService} from '../services/platform/platform.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AppRoutes} from '../app.routes';


SwiperCore.use([Pagination]);

@Component({
  templateUrl: './slide.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlidePage implements OnInit, AfterContentChecked, OnDestroy {

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

  platform: string;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.subscribeToPlatform();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  navigateToLogin() {
    this.router.navigate([AppRoutes.login]);
  }

  private subscribeToPlatform(): void {
    this.platformService.getPlatform()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(platform => {
        this.platform = platform;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
