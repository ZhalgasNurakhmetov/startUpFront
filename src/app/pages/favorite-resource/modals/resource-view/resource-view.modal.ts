import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Mode} from "@ionic/core";
import {Resource} from "../../../../core/models/user";
import {ModalController} from "@ionic/angular";

@Component({
  templateUrl: './resource-view.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceViewModal {

  @Input() platform: Mode;
  @Input() resource: Resource;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
