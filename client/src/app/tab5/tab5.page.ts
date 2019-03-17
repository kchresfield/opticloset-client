import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit { 
  closet: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      this.closet = clothes;
      this.closet.forEach(clothing => {
        clothing.lastUpdated = new Date(clothing.updatedAt).toString().slice(3, 15);
      })
      console.log(this.closet)
    });
  }
}