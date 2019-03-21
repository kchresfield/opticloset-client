import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

const parsedLocalStorage = JSON.parse(localStorage.getItem('itemsToSell'));
const firstItemInObjectKey = Object.keys(parsedLocalStorage)[0];
const firstItemInObjectValue = parsedLocalStorage[firstItemInObjectKey];


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3sell.html',
  styleUrls: ['tab3sell.scss']
})
export class Tab3Sell {
  filteredCloset: any;
  pricePaid: any;
  redirect: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.filteredCloset = firstItemInObjectValue.imageUrl;
    this.pricePaid = firstItemInObjectValue.price;
  }

  nextItem(){
    // delete parsedLocalStorage[firstItemInObjectKey];
    // if(parsedLocalStorage.length === 0){
    //   this.redirect = '../tabs/tab3';
    // }
    // this.redirect = '/sell-on-ebay';
  }

}