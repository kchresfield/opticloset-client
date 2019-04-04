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
  constructor(
    public outfitSelectService: OutfitSelectService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    // this.list = this.outfitSelectService.get('postedArr');
    this.list = this.outfitSelectService.get('closet');

  }

  removeItem(item) {
    console.log(item);
    this.outfitSelectService.remove('closet', item);
  }

  removeFromList(item) {
    // this.outfitSelectService.remove('postedArr', item);
    // this.apiService.deleteClothingItem(item.id_clothing_item);
  }
}
