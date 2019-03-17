import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService],
})

export class Tab1Page implements OnInit {
  closet: any;
  top: any; // 1 or 2
  onePiece: any; // 3
  outerwear: any; // 4
  accessory: any; // 5
  bottom: any; // 6
  shoes: any; // 13

  constructor(private apiService: ApiService) {
  }
  
  ngOnInit() {
    this.apiService.getCloset(clothes => {
      this.top = [...clothes].filter((clothing) => clothing.id_category === 1 || clothing.id_category === 2);
      this.onePiece = [...clothes].filter((clothing) => clothing.id_category === 3);
      this.outerwear = [...clothes].filter((clothing) => clothing.id_category === 4);
      this.accessory = [...clothes].filter((clothing) => clothing.id_category === 5);
      this.bottom = [...clothes].filter((clothing) => clothing.id_category === 6);
      this.shoes = [...clothes].filter((clothing) => clothing.id_category === 13);
      // console.log(this.tops, this.onePiece, this.outerwear, this.accessory, this.bottom);
    });
  }

  getRandomIndex = (max) => {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt));
  };

}