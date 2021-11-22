import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RegistrationFormService} from "./form/registration.form.service";
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {EntityService} from "../../services/entity/entity.service";
import {forEachControlIn} from "ngx-forms-typed";
import {RegistrationApi} from "./api/registration.api";
import {Router} from "@angular/router";
import {finalize, take} from "rxjs/operators";
import {ToasterService} from "../../services/toaster/toaster.service";
import {AppRoutes} from "../../app.routes";

@Component({
  templateUrl: './registration.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit{

  form = this.registrationFormService.initRegistrationForm();
  platform: Mode;
  isLoading: boolean;

  monthList: string[] = this.entityService.monthList;
  cityList: string[] = this.entityService.cityList;

  constructor(
    private platformService: PlatformService,
    private registrationFormService: RegistrationFormService,
    private entityService: EntityService,
    private registrationApi: RegistrationApi,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  registerUser(): void {
    if(this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.registrationApi.register(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(() => {
        this.toaster.show('Вы успешно зарегистрировались', 'success', this.platform);
        this.router.navigate([AppRoutes.login]);
      });
  }

  trackById(index, city: string): string {
    return city;
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
