import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { OutfitSelectService } from '../../services/outfit-select.service';
import { ToastController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';



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
    private outfitSelectService: OutfitSelectService,
    private router: Router
  ) {
    // componentProps can also be accessed at construction time using NavParams
  }

  removeFromCloset() {
    console.log(this.navParams.data);
    this.apiService.deleteClothingItem(
      this.navParams.data.item.id_clothing_item
    );
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

  changeSelectedItem() {
    this.outfitSelectService.set(
      this.navParams.data.item.category,
      this.navParams.data.item
    );
  }

  // redirectTo(uri) {
  //   this.router
  //     .navigateByUrl(uri, { skipLocationChange: true })
  //     .then(() => this.router.navigate([uri]));
  // }

  add() {
    this.outfitSelectService.addToList(this.outfitSelectService.selectedItem);
  }

  chooseItem() {
    this.outfitSelectService.change('sortedCloset', this.navParams.data.item);
  }
}


