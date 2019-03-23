import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';


const selectedItemsToSellObj = {};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  filteredCloset: any;

  constructor(private apiService: ApiService) { }

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
    localStorage.setItem('itemsToSell', JSON.stringify(selectedItemsToSellObj));
  }

  sellAll(){

  }

  reset(){
    delete localStorage.itemsToSell;
  }
}
