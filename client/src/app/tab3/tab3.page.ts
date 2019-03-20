import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  filteredCloset: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCloset(clothes => {
      console.log(clothes)
      this.filteredCloset = [...clothes];
    });
  }
}
