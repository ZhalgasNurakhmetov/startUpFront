import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";

@Component({
  templateUrl: './setting.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPage implements OnInit {

  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate([AppRoutes.login]);
      });
  }

}
