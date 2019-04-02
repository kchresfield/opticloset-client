import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { OutfitSelectService } from '../../services/outfit-select.service';
import { ToastController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
import { UserService } from '../../services/user/user.service';



@Component({
  selector: 'app-item-options-modal',
  templateUrl: './item-options-modal.component.html',
  styleUrls: ['./item-options-modal.component.scss'],
  providers: [ToastController]
})
export class ItemOptionsModal {
  myParameter: boolean;
  myOtherParameter: Date;
  existing: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private apiService: ApiService,
    public toastController: ToastController,
    private outfitSelectService: OutfitSelectService,
    private router: Router,
    public userService: UserService
  ) {}

  // removes selected item from closet
  removeFromCloset() {
    console.log(this.navParams.data);
    this.apiService
      .deleteClothingItem(this.navParams.data.item.id_clothing_item) // delete from DB
      .toPromise()
      .then(() => {
        this.apiService.getCloset(
          // then retrieve the udpated closet from DB
          this.userService.profile['nickname'],
          updatedCloset => {
            console.log(updatedCloset);
            this.outfitSelectService.restore('closet', updatedCloset); // updates closet on outfitSelectService
            this.outfitSelectService.restore('tab4Closet', updatedCloset); // updates tab4Closet on outfitSelectService
            this.closeAfterDeletion(); // closes modal
            this.presentToast(); // display the toast => user feedback
          }
        );
      });
  }

  // close modal
  close() {
    this.modalController.dismiss();
  }

  // close modal
  closeAfterDeletion() {
    this.modalController.dismiss(1);
  }

  // display a toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item removed!',
      position: 'middle',
      animated: true,
      duration: 3000
    });
    toast.present();
  }

  // update the selected item on the outfitSelectService
  changeSelectedItem() {
    this.outfitSelectService.set(
      this.navParams.data.item.category,
      this.navParams.data.item
    );
  }

  // update the sortedCloset on outfitSelectService to the selected item so only see its stats in tab 5/stats page
  chooseItem() {
    this.outfitSelectService.change('sortedCloset', this.navParams.data.item);
  }

  //
  add() {
    // Get the existing data on local storage
    this.existing = localStorage.getItem('itemsToSell');

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    this.existing = this.existing ? JSON.parse(this.existing) : {};

    // Add new data/item to localStorage Array
    this.existing[
      this.outfitSelectService.selectedItem.id_clothing_item
    ] = this.outfitSelectService.selectedItem;

    // Save back to localStorage
    localStorage.setItem('itemsToSell', JSON.stringify(this.existing));

    // Add item to sellArr on service so tab3 gets 'refreshed' as it refers to the same array
    this.outfitSelectService.add(
      'sellArr',
      this.outfitSelectService.selectedItem
    );
  }

}


