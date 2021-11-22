import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {PlatformService} from "./services/platform/platform.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private platformService: PlatformService,
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<any> {
    await this.platform.ready();
    this.platformService.setPlatform(this.platform.is('ios') ? 'ios' : 'md');
  }

}
