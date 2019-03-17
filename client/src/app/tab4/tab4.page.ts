import { Component, OnInit } from '@angular/core';
import { ClothingListK } from '../clothing-item-list';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  closet: any;
  closetK = ClothingListK;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.apiService.getCloset(data => {
      console.log(data);
      this.closet = data;
    });
  }
}