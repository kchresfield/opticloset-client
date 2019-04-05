import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemOptionsModal } from '../modals/item-options-modal/item-options-modal.component';
import { OutfitSelectService } from '../services/outfit-select.service';
import { UserService } from '../services/user/user.service';


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
    public userService: UserService,
  ) {}

  ngOnInit() {
    // this.getAllItems();
    // this.open = this.itemOptionsModal.open;
    this.setCloset();
    // this.setFilter();
  }

  getAllItems() {
    this.apiService.getCloset(this.userService.profile['nickname'], data => {
      console.log(data);
      this.closet = data;
    });
  }

  setCloset() {
    // save a copy of the closet from the service onto the service as tab4Closet
    this.outfitSelectService.save('tab4Closet', [...this.outfitSelectService.closet]);

    // setting the relationship between the closet no tab4 and the tab4Closet on the service
    this.closet = this.outfitSelectService.get('tab4Closet');
  }

  async presentModal(item) {
    const modal = await this.modalController.create({
      component: ItemOptionsModal,
      componentProps: { item: item },
      cssClass: 'my-custom-modal-css',
    });
    // this.itemCategory = category;
    // console.log(this.itemCategory);
    return await modal.present();
  }

  print() {
    console.log(this, this.outfitSelectService.get('closet'));
  }

  select(item) {
    this.outfitSelectService.save('selectedItem', item);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  setFilter() {
    // reset the tab4Closet on service to match the current full closet from the service
    this.outfitSelectService.restore('tab4Closet', this.outfitSelectService.closet);

    // create a filtered closet
    const tempCloset = this.outfitSelectService.get('tab4Closet').filter(clothing => {
      // checks if startDate and endDate have been selected
      if (this.category !== 'all') {
        // checks if clothing worn date is in between startDate and endDate
        return (
          clothing.category === this.category
        );
      }
      return true;
    });

    // replace the tab4Closet on service by the filtered closet
    this.outfitSelectService.restore('tab4Closet', tempCloset);

  }

  onChange() {
    this.setFilter();
    // console.log(this);
  }
}