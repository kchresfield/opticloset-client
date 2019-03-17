import { Component, OnInit } from '@angular/core';
import { ClothingListK } from '../clothing-item-list';
import { ClothingItem } from '../clothing-item';
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
  constructor(
    private apiService: ApiService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllItems();
    // this.open = this.itemOptionsModal.open;
  }

  getAllItems() {
    this.apiService.getCloset(data => {
      console.log(data);
      this.closet = data;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemOptionsModal,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
  
}
