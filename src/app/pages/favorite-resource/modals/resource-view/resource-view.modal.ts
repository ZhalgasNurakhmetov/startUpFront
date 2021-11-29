import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Mode} from "@ionic/core";
import {Resource} from "../../../../core/models/user";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../../app.routes";
import {UserRoutes} from "../../../user/user.routes";

@Component({
  templateUrl: './resource-view.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceViewModal {

  @Input() platform: Mode;
  @Input() resource: Resource;
  isLoading: boolean;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  navigateToUserPage(id: string): void {
    this.modalCtrl.dismiss()
      .then(() => {
        this.router.navigate([AppRoutes.user, UserRoutes.profile, id]);
      });
  }

}
