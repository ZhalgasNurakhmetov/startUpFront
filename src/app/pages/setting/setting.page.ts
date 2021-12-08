import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {ModalService} from "../../services/modal/modal.service";
import {ProfileEditModal} from "./modals/profile-edit/profile-edit.modal";
import {PasswordChangeModal} from "./modals/password-change/password-change.modal";
import {AlertController} from "@ionic/angular";

@Component({
  templateUrl: './setting.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPage implements OnInit {

  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  openProfileEditModal(): void {
    this.modalService.open(ProfileEditModal, this.platform, {platform: this.platform});
  }

  openPasswordChangeModal(): void {
    this.modalService.open(PasswordChangeModal, this.platform, {platform: this.platform});
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      animated: true,
      mode: this.platform,
      header: 'Подтвердите',
      message: `Вы собираетесь выйти`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Готово',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    return await alert.present();
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate([AppRoutes.login]);
      });
  }

}
