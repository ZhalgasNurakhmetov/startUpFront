import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginFormService} from "./form/login.form.service";
import {PlatformService} from "../../services/platform/platform.service";
import {Mode} from "@ionic/core";
import {ToasterService} from "../../services/toaster/toaster.service";
import {AuthService} from "../../core/auth/auth.service";
import {forEachControlIn} from "ngx-forms-typed";
import {finalize, take} from "rxjs/operators";

@Component({
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit{

  form = this.loginFormService.initLoginForm();
  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private loginFormService: LoginFormService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  login(): void {
    if (!this.form.valid) {
      this.toasterService.show('Заполните все поля', 'danger', this.platform);
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.isLoading(true);
    this.authService.login(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading(false);
        })
      )
      .subscribe(token => {
        console.log(token);
      });
  }

  private isLoading(isLoading: boolean): void {
    this.cd.markForCheck();
  }

}
