import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {finalize, take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Resource, User} from "../../core/models/user";
import {ResourceListApi} from "./api/resource-list.api";
import {ModalService} from "../../services/modal/modal.service";
import {ResourceViewModal} from "./modals/resource-view/resource-view.modal";
import {AlertController} from "@ionic/angular";
import {ResourceEditModal} from "./modals/resource-edit/resource-edit.modal";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";
import {ToasterService} from "../../services/toaster/toaster.service";

@Component({
  templateUrl: './resource-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListPage implements OnInit, OnDestroy {

  platform: Mode;
  personalResourceList: Resource[];
  interestedResourceList: Resource[];
  currentUser: User;
  isPersonal = true;
  isLoading: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
    private resourceListApi: ResourceListApi,
    private modalService: ModalService,
    private alertCtrl: AlertController,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToCurrentUser();
  }

  chooseResourceList(): void {
    this.isPersonal = !this.isPersonal;
  }

  openResourceViewModal(resource: Resource): void {
    this.modalService.open(ResourceViewModal, this.platform, {resource, platform: this.platform, currentUser: this.currentUser});
  }

  openResourceEditModal(resource: Resource): void {
    this.modalService.open(ResourceEditModal, this.platform, {resource, platform: this.platform, currentUser: this.currentUser});
  }

  async uploadImage(resourceId: string): Promise<void> {
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
    formData.append('image', blob, resourceId);
    this.resourceListApi.uploadImage(resourceId, formData)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(editedResource => {
        const index = this.currentUser.resourceList.findIndex(res => res.id === editedResource.id);
        this.currentUser.resourceList.splice(index, 1, editedResource);
        this.currentUserService.setCurrentUser(this.currentUser);
        this.toaster.show('Изображение добавлено', 'success', this.platform);
      });
  }

  async showAlert(resourceId: string, isPersonalList: boolean) {
    const alert = await this.alertCtrl.create({
      animated: true,
      mode: this.platform,
      header: 'Подтвердите',
      message: `Вы собираетесь удалить ресурс`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Готово',
          handler: () => {
            this.deleteResource(resourceId, isPersonalList);
          }
        }
      ]
    });
    return await alert.present();
  }

  deleteResource(resourceId: string, isPersonalList: boolean): void {
    this.showLoading(true);
    this.resourceListApi.deleteResource(resourceId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(deletedResource => {
        if (isPersonalList) {
          const index = this.personalResourceList.findIndex(resource  => resource.id === deletedResource.id);
          this.personalResourceList.splice(index, 1);
        } else {
          const index = this.interestedResourceList.findIndex(resource  => resource.id === deletedResource.id);
          this.interestedResourceList.splice(index, 1);
        }
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
          resourceList: [
            ...this.personalResourceList,
            ...this.interestedResourceList,
          ],
        });
      });
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(currentUser => {
        this.personalResourceList = currentUser.resourceList.filter(resource => resource?.personal);
        this.interestedResourceList = currentUser.resourceList.filter(resource => !resource?.personal);
        this.currentUser = currentUser;
        this.cd.markForCheck();
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
