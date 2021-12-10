import {Injectable} from "@angular/core";
import {ToastController, ToastOptions} from "@ionic/angular";
import {Color, Mode} from "@ionic/core";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private toastCtrl: ToastController,
  ) { }

  async show(message: string, color: Color, mode: Mode, limit: boolean = true) {
    const toastBaseOptions: ToastOptions = {
      message,
      position: 'top',
      color,
      mode,
      cssClass: ['ion-text-center',],
      animated: true,
    };

    const toastOptions: ToastOptions = limit ? {
      ...toastBaseOptions,
      duration: 1500,
    } : {
      ...toastBaseOptions,
      buttons: [
        {
          text: 'Закрыть',
          side: 'end',
          handler: () => {
            this.toastCtrl.dismiss();
          }
        }
      ]
    };

    const toast = await this.toastCtrl.create({
      ...toastOptions,
    });
    await toast.present();
  }

  dismiss(): void {
    this.toastCtrl.dismiss();
  }

}
