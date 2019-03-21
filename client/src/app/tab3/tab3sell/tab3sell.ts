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
  filteredCloset = firstItemInObjectValue.imageUrl;
  pricePaid = firstItemInObjectValue.price;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  
  }

}