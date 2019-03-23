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
  category = 'all';
  constructor(
    private apiService: ApiService,
    public modalController: ModalController,
    public outfitSelectService: OutfitSelectService,
  ) {}

  ngOnInit() {
    // this.getAllItems();
    // this.open = this.itemOptionsModal.open;
    this.setCloset();
    this.setFilter();
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

  setFilter() {

    const tempCloset = [...this.outfitSelectService.get('closet')];
    const filteredCloset = tempCloset.filter(clothing => {
      // checks if startDate and endDate have been selected
      if (this.category !== 'all') {
        // checks if clothing worn date is in between startDate and endDate
        return (
          clothing.category === this.category
        );
      }
      return true;
    });
    this.closet = filteredCloset;
  }

  onChange() {
    this.setFilter();
    console.log(this);
  }
}