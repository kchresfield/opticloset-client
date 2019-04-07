import { Component, OnInit } from '@angular/core';
import { OutfitSelectService } from '../../services/outfit-select.service';
import { ApiService } from '../../services/api/api.service';



@Component({
  selector: 'app-posted-list',
  templateUrl: './posted-list.page.html',
  styleUrls: ['./posted-list.page.scss']
})
export class PostedListPage implements OnInit {
  list: any;
  existing: any;
  constructor(
    public outfitSelectService: OutfitSelectService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    // this.list = this.outfitSelectService.get('postedArr');
    this.list = this.outfitSelectService.get('postedList');

  }

  removeItem(item) {
    console.log(item);
    this.outfitSelectService.removeI('postedList', item);
    // Get the existing data on local storage
    this.existing = JSON.parse(localStorage.getItem('postedList'));

    console.log('postedLocal', this.existing);
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    // this.existing = this.existing ? JSON.parse(this.existing) : {};

    // Add new data/item to localStorage Array
    // this.existing[
    //   this.outfitSelectService.selectedItem.id_clothing_item
    // ] = this.outfitSelectService.selectedItem;

    delete this.existing[item.id];

    // Save back to localStorage
    localStorage.setItem('postedList', JSON.stringify(this.existing));

  }

  removeFromList(item) {
    // this.outfitSelectService.remove('postedArr', item);
    // this.apiService.deleteClothingItem(item.id_clothing_item);
  }
}
