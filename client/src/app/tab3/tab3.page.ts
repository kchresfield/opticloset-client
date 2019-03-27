import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { OutfitSelectService } from '../services/outfit-select.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



let selectedItemsToSellObj = {};

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
    // setting relationship between tab3 listArr and sellArr on service for dynamic refreshing
    this.listArr = this.outfitSelectService.get('sellArr');
  }

  radioValueSellOrKeep(clothingId, keepOrSell, clothingInfo) {
    if (keepOrSell === 1) {
      selectedItemsToSellObj[clothingId] = clothingInfo;
    }
    if (keepOrSell === 0 && selectedItemsToSellObj[clothingId]) {
      delete selectedItemsToSellObj[clothingId];
    }
    console.log(selectedItemsToSellObj);
  }

  sell(){
    if (!Object.keys(selectedItemsToSellObj).length) {
      return this.presentToast();
    }
    localStorage.setItem('itemsToSell', JSON.stringify(selectedItemsToSellObj));
    this.router.navigate(['/sell-on-ebay']);
  }

  sellAll() {}

  print() {
    console.log(this.listArr, this.outfitSelectService.get('sellArr'));
  }
  reset() {
    selectedItemsToSellObj = {};
    delete localStorage.itemsToSell;
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
