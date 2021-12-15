import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {Observable} from "rxjs";
import {ProfileApi} from "./api/profile.api";
import {finalize, take} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";

@Component({
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  currentUser$: Observable<User>;
  platform: Mode;
  isLoading: boolean;
  refreshingAttribute: string;

  apiUrl = environment.apiUrl;

  constructor(
    private currentUserService: CurrentUserService,
    private platformService: PlatformService,
    private router: Router,
    private profileApi: ProfileApi,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUser$ = this.currentUserService.getCurrentUser();
    this.refreshingAttribute = this.platform === 'ios' ? 'lines' : 'circular';
  }

  async uploadPhoto(id: string): Promise<void> {
    const capturedPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      promptLabelHeader: 'Выберите источник',
      promptLabelPhoto: 'Галерея',
      promptLabelPicture: 'Сделать снимок',
      promptLabelCancel: 'Отмена',
      quality: 100,
      allowEditing: false,
    });
    this.showLoading(true);
    const base64 = await fetch('data:image/jpeg;base64,' + capturedPhoto.base64String);
    const blob = await base64.blob();
    const formData = new FormData();
    formData.append('photo', blob, id);
    this.profileApi.uploadPhoto(formData)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(user => {
        this.currentUserService.setCurrentUser(user);
        this.currentUser$ = this.currentUserService.getCurrentUser();
      });
  }

  navigateToFavorite(): void {
    this.router.navigate([AppRoutes.favorites]);
  }

  navigateToSetting(): void {
    this.router.navigate([AppRoutes.setting]);
  }

  navigateToContact(): void {
    this.router.navigate([AppRoutes.contact]);
  }

  refresh($event: any) {
    this.showLoading(true);
    this.profileApi.getCurrentUser()
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        }),
      )
      .subscribe(user => {
        this.currentUserService.setCurrentUser(user);
      });
    setTimeout(() => {
      $event.target.complete();
    });
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
