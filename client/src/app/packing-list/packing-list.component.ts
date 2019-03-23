import { Component, OnInit } from '@angular/core';
import { ClothingListK } from '../clothing-item-list';
import { ClothingItemK } from 'app/clothing-item';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss'],
})
export class PackingListComponent implements OnInit {
  outfit:any;

  constructor(
    // private clothingList: ClothingItemK[],
  ) { }
  
  ngOnInit() {
    // this.outfit = ClothingListK;
  }

}
