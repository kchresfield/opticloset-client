import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ClothingItemK } from '../clothing-item';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';
import { OutfitSelectService } from '../services/outfit-select.service';


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

  constructor(private apiService: ApiService, public outfitSelectService: OutfitSelectService) { }

  ngOnInit() {
    this.setCloset();
  }

  // checks if current 'diplayed' closet is smaller than the initial closet on the service
  // and restore the current closet to match the initial closet if needed
  checkAndRestoreCloset() {
    if (this.closet.length < this.outfitSelectService.get('closet').length) {
      const closet = this.outfitSelectService.get('closet');
      const newSortedCloset = [...closet];
      newSortedCloset.sort((a, b) => {
        return a.count_worn - b.count_worn; // sort the closet from least worn to most worn
      });
      this.outfitSelectService.restore('sortedCloset', newSortedCloset);
    }
  }

  // sort the currently displayed closet based on the method provided
  sortCloset(method) {
    if (method === 'most2Least') {
      this.closet.sort((a, b) => {
        return b.count_worn - a.count_worn;
      });
      }
    if (method === 'least2Most') {
      this.closet.sort((a, b) => {
        return a.count_worn - b.count_worn;
      });
    }
  }

  setFilter() {
    // creates a copy of the initial closet from the service, sort it & filters it
    const tempCloset = [...this.outfitSelectService.get('closet')];
    tempCloset.sort((a, b) => {
      return b.count_worn - a.count_worn;
    });

    const filteredCloset = tempCloset.filter(clothing => {
      // checks if startDate and endDate have been selected
      if (this.startDate && this.endDate) {
        // checks if clothing worn date is in between startDate and endDate
        // console.log('test2', this.startDate, this.endDate);
        return (
          new Date(this.startDate.valueOf()) <= new Date(clothing.updatedAt.valueOf()) &&
          new Date(this.endDate.valueOf()) >= new Date(clothing.updatedAt.valueOf())
        );
      }
      return true;
    });
    // then replaces the sortedCloset on the service with the newly created sorted and filtered closet
    this.outfitSelectService.restore('sortedCloset', filteredCloset);
  }

  // reset the start & end dates and replace the sortedCloset on the service by an initial closet
  resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.checkAndRestoreCloset();
  }

  setCloset() {
    this.closet = this.outfitSelectService.get('sortedCloset');
  }
  retrieveItem() {
    console.log('closet from outfitSelect service', this.outfitSelectService.get('closet'));
    console.log('sorted Closet from outfitSelect service', this.outfitSelectService.get('sortedCloset'));
    console.log('closet from tab5', this.closet);
  }
}
