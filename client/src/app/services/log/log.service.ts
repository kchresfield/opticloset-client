import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    public alertController: AlertController
  ) { }

  async log(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: JSON.stringify(msg, null, 2),
      buttons: ['OK']
    });

    await alert.present();
  }

}
