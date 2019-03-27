import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



let selectedItemsToSellObj = {};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  filteredCloset: any;

  constructor(
    private apiService: ApiService,
    public toastController: ToastController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      console.log(clothes)
      this.filteredCloset = [...clothes];
    });
  }

  radioValueSellOrKeep(clothingId, keepOrSell, clothingInfo){
    if(keepOrSell === 1){
      selectedItemsToSellObj[clothingId] = clothingInfo;
    } 
    if (keepOrSell === 0 && selectedItemsToSellObj[clothingId] ) {
      delete selectedItemsToSellObj[clothingId];
    }
    console.log(selectedItemsToSellObj);
  }

  sell(){
    if(!Object.keys(selectedItemsToSellObj).length){
      return this.presentToast();
    }
    localStorage.setItem('itemsToSell', JSON.stringify(selectedItemsToSellObj));
    this.router.navigate(['/sell-on-ebay']);
  }

  sellAll(){

  }

  reset(){
    selectedItemsToSellObj = {};
    delete localStorage.itemsToSell;
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
