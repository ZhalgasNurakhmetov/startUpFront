import {Injectable} from "@angular/core";
import {ModalController, ModalOptions} from "@ionic/angular";
import {Mode} from "@ionic/core";

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  async open(component: any, platform: Mode, componentProps: any) {
    const modalBaseOptions: ModalOptions = {
      animated: true,
      mode: platform,
      component,
      componentProps,
    };

    const iosModalOptions: ModalOptions = {
      ...modalBaseOptions,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
    };

    const androidModalOptions: ModalOptions = {
      ...modalBaseOptions,
      backdropDismiss: true,
    };
    const options = platform === 'ios' ? iosModalOptions : androidModalOptions;
    const modal = await this.modalCtrl.create(options);
    return await modal.present();
  }

}
