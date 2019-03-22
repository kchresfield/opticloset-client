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

  checkAndRestoreCloset() {
    if (this.closet.length < this.outfitSelectService.get('closet').length) {
      const closet = this.outfitSelectService.get('closet');
      // console.log('single item closet', closet);

      const newSortedCloset = [...closet];
      newSortedCloset.sort((a, b) => {
        return a.count_worn - b.count_worn; // sort the closet from least worn to most worn
      });
      console.log('test', newSortedCloset);
      // sortedCloset.forEach(clothing => { // for each item in the sorted closet
      //   clothing.lastUpdated = new Date(clothing.updatedAt).toString().slice(3, 15); // add a property lastUpdated
      // });
      this.outfitSelectService.restore('sortedCloset', newSortedCloset);
      this.setCloset();
      // save the sorted closet on the service
    }
    }

  sortCloset(method) {
    // console.log(this.filteredCloset);
    // this.checkCloset();
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
    console.log('theTest', this.closet);


    // const copyCloset = [...this.closet];

    this.closet = [...this.outfitSelectService.get('sortedCloset')].filter((clothing) => {
      // checks if startDate and endDate have been selected
      if (this.startDate && this.endDate) {
        // checks if clothing worn date is in between startDate and endDate
        return new Date(this.startDate.valueOf()) < new Date(clothing.updatedAt.valueOf()) &&
          new Date(this.endDate.valueOf()) > new Date(clothing.updatedAt.valueOf());
      }
      return true;
    });
  }

  setCloset() {
    this.closet = this.outfitSelectService.get('sortedCloset');
  }
  retrieveItem() {
    console.log('closet from api service', this.outfitSelectService.get('closet'));
    console.log('sorted Closet from api service', this.outfitSelectService.get('sortedCloset'));
    console.log('filtered Closet from api service', this);
  }
}
