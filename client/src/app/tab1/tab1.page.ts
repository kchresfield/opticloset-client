import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { OutfitSelectService } from '../services/outfit-select.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { Tab4Page } from '../tab4/tab4.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService, ToastController, AuthService, Tab4Page]
})
export class Tab1Page implements OnInit {
  closet: Array<Object>;
  outfit: Object;
  top: Object; // 1 or 2
  onePiece: Object; // 3
  outerwear: Object; // 4
  accessory: Object; // 5
  bottom: Object; // 6
  shoe: Object; // 13
  isLoading: Boolean;
  outfitSelected: Boolean;
  matchMethod: any;
  occasion: any;

  // @HostBinding('class.is-open')
  // isOpen = false;


  constructor(
    private apiService: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public outfitSelectService: OutfitSelectService,
    public userService: UserService,
    public tab4Page: Tab4Page,
  ) {}

  ngOnInit() {
    const self = this;
    this.isLoading = true;
    this.outfitSelected = false;
    this.presentLoadingOutfit();
    
    this.userService.getUser().then((profile) => {
      this.apiService.getCloset(profile['nickname'], clothes => {
        this.closet = clothes;
        this.outfitSelectService.save('closet', this.closet);
        this.outfitSelectService.setMock();
        this.outfitSelectService.chooseMatchingOutfit(null, null);
        this.outfit = this.outfitSelectService.getOutfit();
        this.isLoading = false;
        setTimeout(function () { 
          self.loadingController.dismiss();
        }, 3000);
      });
    })
    // testing for matching feature
    // this.outfitSelectService.setMock();
    // this.outfitSelectService.chooseMatchingOutfit(null, null);
    // this.outfit = this.outfitSelectService.getOutfit();

    // this.outfitSelectService.set.subscribe(isOpen => {
    //   this.isOpen = isOpen;
    // });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Great Choice!',
      position: 'middle',
      animated: true,
      duration: 3000
    });
    toast.present();
    this.outfitSelected = true;
  }

  async presentLoadingOutfit() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 4000,
      message: `One moment while we select your outfit...`,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  getRandomIndex = max => {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * maxInt);
  };

  setMatchMethod () {
    console.log(this.matchMethod, 'match', this.occasion, 'occasion');
    this.outfitSelectService.chooseMatchingOutfit(this.matchMethod, this.occasion)
    this.outfit = this.outfitSelectService.getOutfit();
  }

  retrieveOutfit() {
    console.log(this.outfitSelectService.getOutfit());
  }

  changeClothingItem(category) {
    this.tab4Page.category = category;
    setTimeout(() => {
      this.tab4Page.setFilter();
    }, 0);
  }
}
