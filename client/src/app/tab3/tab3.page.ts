import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { OutfitSelectService } from '../services/outfit-select.service';


const selectedItemsToSellObj = {};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  list: any;

  constructor(
    private apiService: ApiService,
    private outfitSelectService: OutfitSelectService,
  ) {}

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      console.log(clothes);
      this.list = [...clothes];
    });

    // this.list = this.outfitSelectService.get('sellList');
    // localStorage.setItem(
    //   'itemsToSell',
    //   JSON.stringify(selectedItemsToSellObj)
    // );
    // console.log(this.list);
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

  sell() {
    localStorage.setItem('itemsToSell', JSON.stringify(selectedItemsToSellObj));
  }

  sellAll() {}

  reset() {
    delete localStorage.itemsToSell;
  }
}
