import { Component, OnInit } from '@angular/core';
import { ClothingListK } from '../clothing-item-list';
import { ClothingItemK } from '../clothing-item';
import { ApiService } from '../services/api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemOptionsModal } from '../modals/item-options-modal/item-options-modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  closet: any;
  closetK = ClothingListK;
  open: any;
  value: any;
  constructor(
    private apiService: ApiService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.apiService.getCloset(data => {
      console.log(data);
      this.closet = data;
    });
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ItemOptionsModal,
      componentProps: { itemId: id }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data === 1) {
        this.getAllItems();
      }
    });

    return await modal.present();
  }

}
