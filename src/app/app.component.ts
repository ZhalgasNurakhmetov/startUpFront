import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {PlatformService} from "./services/platform/platform.service";
import {SingleTimeService} from "./services/single-time/single-time.service";
import {Router} from "@angular/router";
import {AppRoutes} from "./app.routes";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private platformService: PlatformService,
    private singleTimeService: SingleTimeService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<any> {
    await this.platform.ready();
    this.platformService.setPlatform(this.platform.is('ios') ? 'ios' : 'md');
    this.checkIsFirstTime();
  }

  private checkIsFirstTime(): void {
    this.singleTimeService.getIsNotFirstTime()
      .subscribe(isFirstTime => {
        if (!isFirstTime) {
          this.router.navigate([AppRoutes.slides]);
          return;
        }
        this.router.navigate([AppRoutes.login]);
      });
  }
}
