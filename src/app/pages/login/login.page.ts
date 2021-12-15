import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginFormService} from "./form/login.form.service";
import {PlatformService} from "../../services/platform/platform.service";
import {Mode} from "@ionic/core";
import {AuthService} from "../../core/auth/auth.service";
import {forEachControlIn} from "ngx-forms-typed";
import {finalize, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {SplashScreen} from "@capacitor/splash-screen";
import {StatusBar} from "@capacitor/status-bar";

@Component({
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit{

  form = this.loginFormService.initLoginForm();
  platform: Mode;
  isLoading: boolean;

  constructor(
    private platformService: PlatformService,
    private loginFormService: LoginFormService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    // StatusBar.hide();
    // SplashScreen.hide();
  }

  login(): void {
    if (this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.authService.login(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(token => {
        this.authService.setToken(token.access_token);
        this.router.navigate([AppRoutes.tabs]);
      });
  }

  navigateToRegistration(): void {
    this.router.navigate([AppRoutes.registration]);
  }

  navigateToPasswordRestore(): void {
    this.router.navigate([AppRoutes.passwordRestore]);
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
