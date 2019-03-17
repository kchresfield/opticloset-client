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
    this.apiService.getCloset(data => {
      console.log(data);
      this.closet = data;
    });
  }
}