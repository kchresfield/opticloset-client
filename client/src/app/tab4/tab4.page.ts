import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemOptionsModal } from '../modals/item-options-modal/item-options-modal.component';
import { OutfitSelectService } from '../services/outfit-select.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  closet: any;
  open: any;
  item: number;
  itemCategory: any;
  constructor(
    private apiService: ApiService,
    public modalController: ModalController,
    public outfitSelectService: OutfitSelectService,
  ) {}

  ngOnInit() {
    // this.getAllItems();
    // this.open = this.itemOptionsModal.open;
    this.setCloset();
  }

  getAllItems() {
    this.apiService.getCloset(data => {
      console.log(data);
      this.closet = data;
    });
  }

  setCloset() {
    this.closet = this.outfitSelectService.get('closet');
  }

  async presentModal(item) {
    const modal = await this.modalController.create({
      component: ItemOptionsModal,
      componentProps: { item: item }
    });
    // this.itemCategory = category;
    // console.log(this.itemCategory);
    return await modal.present();
  }

  print(item) {
    console.log(item);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
