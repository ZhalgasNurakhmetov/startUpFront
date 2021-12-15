import {ChangeDetectionStrategy, Component, NgZone, OnDestroy} from '@angular/core';
import {Platform} from '@ionic/angular';
import {PlatformService} from "./services/platform/platform.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy{

  private platformPause$: Subscription;
  private platformResume$: Subscription;

  constructor(
    private platform: Platform,
    private platformService: PlatformService,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<any> {
    await this.platform.ready();
    this.platformService.setPlatform(this.platform.is('ios') ? 'ios' : 'md');
    this.checkPlatformState();
  }

  checkPlatformState(): void {
    this.platformPause$ = this.platform.pause
      .subscribe(() => this.ngZone.run(() => {
        this.platformService.setRoutePath(this.router.url);
      }));
    this.platformResume$ = this.platform.resume
      .subscribe(() => this.ngZone.run(() => {
        this.platformService.getLastRoutePath()
          .then(path => {
            this.router.navigate([path]);
          });
      }));
  }

  ngOnDestroy(): void {
    this.platformPause$.unsubscribe();
    this.platformResume$.unsubscribe();
  }

}
