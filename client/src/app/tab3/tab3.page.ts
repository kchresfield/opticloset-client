import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { UserService } from '../services/user/user.service';
import { OutfitSelectService } from '../services/outfit-select.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



let selectedItemsToSellObj;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  list: any;
  listArr = [];

  constructor(
    private apiService: ApiService,
    private outfitSelectService: OutfitSelectService,
    public toastController: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    selectedItemsToSellObj = {};
    // setting relationship between tab3 listArr and sellArr on service for dynamic refreshing
    this.listArr = this.outfitSelectService.get('sellArr');
    console.log(this.listArr);
    localStorage.removeItem('selectedItemsToSell');
  }

  radioValueSellOrKeep(clothingId, keepOrSell, clothingInfo) {
    if (keepOrSell === 1) {
      selectedItemsToSellObj[clothingId] = clothingInfo;
    }
    if (keepOrSell === 0 && selectedItemsToSellObj[clothingId]) {
      delete selectedItemsToSellObj[clothingId];
    }
  }

  sell(){
    if (!Object.keys(selectedItemsToSellObj).length) {
      return this.presentToast();
    }
    // debugger;
    localStorage.setItem('selectedItemsToSell', JSON.stringify(selectedItemsToSellObj));
    this.router.navigate(['home/tabs/tab3/sell-on-ebay']);
  }

  sellAll() {
    this.outfitSelectService.get('sellArr').forEach((item) => {
      selectedItemsToSellObj[item.id_clothing_item] = item;
    })
    localStorage.setItem('selectedItemsToSell', JSON.stringify(selectedItemsToSellObj));
    this.router.navigate(['home/tabs/tab3/sell-on-ebay']);
  }

  reset() {
    selectedItemsToSellObj = {};
    // delete localStorage.itemsToSell;
    this.outfitSelectService.empty('sellArr');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please select at least 1 item',
      position: 'top',
      animated: true,
      duration: 2000
    });
    toast.present();
  }
}
