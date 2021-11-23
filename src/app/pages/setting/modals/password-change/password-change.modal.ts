import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PasswordChangeFormService} from "./form/password-change.form.service";
import {SettingApi} from "../../api/setting.api";
import {Mode} from "@ionic/core";
import {ModalController} from "@ionic/angular";
import {forEachControlIn} from "ngx-forms-typed";
import {finalize, take} from "rxjs/operators";
import {CurrentUserService} from "../../../../services/current-user/current-user.service";
import {ToasterService} from "../../../../services/toaster/toaster.service";

@Component({
  templateUrl: './password-change.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PasswordChangeFormService, SettingApi]
})
export class PasswordChangeModal implements OnInit {

  @Input() platform: Mode;
  form = this.passwordChangeFormService.initPasswordChangeForm();
  isLoading: boolean;

  constructor(
    private passwordChangeFormService: PasswordChangeFormService,
    private settingApi: SettingApi,
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private currentUserService: CurrentUserService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    if (this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.settingApi.changePassword(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(user => {
        this.currentUserService.setCurrentUser(user);
        this.toaster.show('Пароль успешно изменен', 'success', this.platform);
        this.dismiss();
      });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
    this.form.reset();
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }


}
