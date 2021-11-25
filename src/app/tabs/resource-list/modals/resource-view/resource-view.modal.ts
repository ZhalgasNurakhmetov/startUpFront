import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Mode} from "@ionic/core";
import {Resource, User} from "../../../../core/models/user";
import {AlertController, ModalController} from "@ionic/angular";
import {ResourceListApi} from "../../api/resource-list.api";
import {finalize, take} from "rxjs/operators";
import {CurrentUserService} from "../../../../services/current-user/current-user.service";

@Component({
  templateUrl: './resource-view.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResourceListApi]
})
export class ResourceViewModal {

  @Input() platform: Mode;
  @Input() resource: Resource;
  @Input() currentUser: User;

  isLoading: boolean;

  constructor(
    private modalCtrl: ModalController,
    private resourceListApi: ResourceListApi,
    private currentUserService: CurrentUserService,
    private alertCtrl: AlertController,
    private cd: ChangeDetectorRef,
  ) { }

  async showAlert(resourceId: string) {
    const alert = await this.alertCtrl.create({
      animated: true,
      mode: this.platform,
      header: 'Подтвердите',
      message: `Вы собираетесь ${this.resource.available ? 'закрыть' : 'открыть'} доступ к ресурсу`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Готово',
          handler: () => {
            this.setAvailability(resourceId);
          }
        }
      ]
    });
    return await alert.present();
  }

  setAvailability(resourceId: string): void {
    this.showLoading(true);
    this.resourceListApi.setAvailability(resourceId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(modifiedResource => {
        this.resource = modifiedResource;
        const index = this.currentUser.resourceList.findIndex(resource => resource.id === modifiedResource.id);
        this.currentUser.resourceList.splice(index, 1, modifiedResource);
        this.currentUserService.setCurrentUser(this.currentUser);
      });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
