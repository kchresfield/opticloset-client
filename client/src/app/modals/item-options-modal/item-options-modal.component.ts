import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-item-options-modal',
  templateUrl: './item-options-modal.component.html',
  styleUrls: ['./item-options-modal.component.scss'],
  providers: [ToastController]
})
export class ItemOptionsModal {
  // "value" passed in componentProps
  // @Input() value: number;
  myParameter: boolean;
  myOtherParameter: Date;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private apiService: ApiService,
    public toastController: ToastController,
  ) {
    // componentProps can also be accessed at construction time using NavParams
  }

  removeFromCloset() {
    console.log(this.navParams.data.itemId);
    this.apiService.deleteClothingItem(this.navParams.data.itemId);
    this.closeAfterDeletion();
    this.presentToast();

  }

  close() {
    this.modalController.dismiss();
    console.log(this.navParams);
  }

  closeAfterDeletion() {
    this.modalController.dismiss(1);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item removed!',
      position: 'middle',
      animated: true,
      duration: 3000
    });
    toast.present();
  }


}


