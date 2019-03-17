import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ClothingItem } from '../clothing-item';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit { 
  closet: any;
  filteredCloset: any;
  startDate: Date;
  endDate: Date;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      this.closet = clothes.sort((a, b) => {
        return a.count_worn - b.count_worn;
      });
      this.closet.forEach(clothing => {
        clothing.lastUpdated = new Date(clothing.updatedAt).toString().slice(3, 15);
      })
      this.filteredCloset = [...this.closet];
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

  setFilter() {
    const copyCloset = [...this.closet];
    this.filteredCloset = copyCloset.filter((clothing) => {
      // checks if startDate and endDate have been selected
      if (this.startDate && this.endDate) {
        // checks if clothing worn date is in between startDate and endDate
        return new Date(this.startDate.valueOf()) < new Date(clothing.updatedAt.valueOf()) &&
          new Date(this.endDate.valueOf()) > new Date(clothing.updatedAt.valueOf())
      }
      return true;
    })
  }

}