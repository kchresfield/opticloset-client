import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService, ToastController],
})

export class Tab1Page implements OnInit {
  closet: any;
  top: any; // 1 or 2
  onePiece: any; // 3
  outerwear: any; // 4
  accessory: any; // 5
  bottom: any; // 6
  shoe: any; // 13

  constructor(private apiService: ApiService, public toastController: ToastController) {
  }
  
  ngOnInit() {
    this.apiService.getCloset(clothes => {
      this.closet = clothes;
      this.chooseOutfit();
    });
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Great Choice!',
      position: 'middle',
      animated: true,
      duration: 3000,
    });
    toast.present();
  }
  
  getRandomIndex = (max) => {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt));
  };
  
  chooseOutfit = () => {
    // copy closet and filter by category
    const tops = [...this.closet].filter((clothing) => clothing.id_category === 1 || clothing.id_category === 2);
    const onePieces = [...this.closet].filter((clothing) => clothing.id_category === 3);
    const outerwears = [...this.closet].filter((clothing) => clothing.id_category === 4);
    const accessories = [...this.closet].filter((clothing) => clothing.id_category === 5);
    const bottoms = [...this.closet].filter((clothing) => clothing.id_category === 6);
    const shoes = [...this.closet].filter((clothing) => clothing.id_category === 13);

    this.top = tops[this.getRandomIndex(tops.length)];
    this.onePiece = onePieces[this.getRandomIndex(onePieces.length)];
    this.outerwear = outerwears[this.getRandomIndex(outerwears.length)];
    this.accessory = accessories[this.getRandomIndex(accessories.length)];
    this.bottom = bottoms[this.getRandomIndex(bottoms.length)];
    this.shoe = shoes[this.getRandomIndex(shoes.length)];
    // console.log(this.tops, this.onePiece, this.outerwear, this.accessory, this.bottom);
  };

}