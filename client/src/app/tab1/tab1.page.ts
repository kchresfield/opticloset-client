import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService, ToastController],
})

export class Tab1Page implements OnInit {
  closet: Array<Object>;
  top: Object; // 1 or 2
  onePiece: Object; // 3
  outerwear: Object; // 4
  accessory: Object; // 5
  bottom: Object; // 6
  shoe: Object; // 13
  isLoading: Boolean;
  outfitSelected: Boolean;

  constructor(
    private apiService: ApiService, 
    public toastController: ToastController, 
    public loadingController: LoadingController, 
  ) { }
  
  ngOnInit() {
    this.isLoading = true;
    this.outfitSelected = false;
    this.presentLoadingWithOptions();
    this.apiService.getCloset(clothes => {
      this.closet = clothes;
      this.chooseOutfit();
      this.isLoading = false;
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
    this.outfitSelected = true;
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: 'One moment while we select your outfit...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
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
  };

}