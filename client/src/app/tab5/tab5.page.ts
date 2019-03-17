import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ClothingItem } from '../clothing-item';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit { 
  closet: any;
  sort: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      this.closet = clothes.sort((a, b) => {
        return a.count_worn - b.count_worn;
      });
      this.closet.forEach(clothing => {
        clothing.lastUpdated = new Date(clothing.updatedAt).toString().slice(3, 15);
      })
      console.log(this.closet)
    });
  }

  sortCloset(method) {
    if (method === 'most2Least') {
      this.closet.sort((a, b) => {
        return b.count_worn - a.count_worn;
      })
    }
    if (method === 'least2Most') {
      this.closet.sort((a, b) => {
        return a.count_worn - b.count_worn;
      })
    }
  }
}