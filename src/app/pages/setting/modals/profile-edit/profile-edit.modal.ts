import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProfileEditFormService} from "./form/profile-edit.form.service";
import {CurrentUserService} from "../../../../services/current-user/current-user.service";
import {Subject} from "rxjs";
import {finalize, take, takeUntil} from "rxjs/operators";
import {Mode} from "@ionic/core";
import {ModalController} from "@ionic/angular";
import {EntityService} from "../../../../services/entity/entity.service";
import {SettingApi} from "../../api/setting.api";
import {forEachControlIn} from "ngx-forms-typed";
import {ToasterService} from "../../../../services/toaster/toaster.service";

@Component({
  templateUrl: './profile-edit.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileEditFormService, SettingApi]
})
export class ProfileEditModal implements OnInit, OnDestroy {

  @Input() platform: Mode;

  form = this.profileEditFormService.initProfileEditForm();
  cityList: string[];
  monthList: string[];

  isLoading: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private profileEditFormService: ProfileEditFormService,
    private currentUserService: CurrentUserService,
    private modalCtrl: ModalController,
    private entityService: EntityService,
    private settingApi: SettingApi,
    private cd: ChangeDetectorRef,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.subscribeToCurrentUser();
    this.cityList = this.entityService.cityList;
    this.monthList = this.entityService.monthList;
  }

  editProfile(): void {
    if (this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.settingApi.editProfile(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(user => {
        this.currentUserService.setCurrentUser(user);
        this.toaster.show('Данные успешно изменены', 'success', this.platform);
        this.dismiss();
      });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
    this.form.reset();
  }

  trackById(index, city: string): string {
    return city;
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(currentUser => {
        this.form.patchValue({
          ...currentUser
        });
      });
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
