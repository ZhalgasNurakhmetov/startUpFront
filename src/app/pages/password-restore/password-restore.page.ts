import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {PasswordRestoreFormService} from "./form/password-restore.form.service";
import {forEachControlIn} from "ngx-forms-typed";
import {ToasterService} from "../../services/toaster/toaster.service";
import {PasswordRestoreApi} from "./api/password-restore.api";
import {finalize, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";

@Component({
  templateUrl: './password-restore.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRestorePage implements OnInit {

  form = this.passwordRestoreFormService.initPasswordRestoreForm();
  platform: Mode;
  isLoading: boolean;

  constructor(
    private platformService: PlatformService,
    private passwordRestoreFormService: PasswordRestoreFormService,
    private toaster: ToasterService,
    private passwordRestoreApi: PasswordRestoreApi,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  restorePassword(): void {
    if(this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.passwordRestoreApi.restorePassword(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(() => {
        this.toaster.show('Ссылка для восстановления пароля отправлена на указанную почту', 'success', this.platform);
        this.router.navigate([AppRoutes.login]);
      });
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
