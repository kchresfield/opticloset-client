import { Component, OnInit } from '@angular/core';
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

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ItemOptionsModal,
      componentProps: { itemId: id }
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
