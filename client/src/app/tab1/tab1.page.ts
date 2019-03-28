import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { OutfitSelectService } from '../services/outfit-select.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService, ToastController, AuthService]
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

  // @HostBinding('class.is-open')
  // isOpen = false;


  constructor(
    private apiService: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public outfitSelectService: OutfitSelectService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    console.log('local storage', localStorage);
    this.isLoading = true;
    this.outfitSelected = false;
    this.presentLoadingWithOptions();
    this.userService.getUser().then((profile) => {
      console.log(profile['nickname'])
      this.apiService.getCloset(profile['nickname'], clothes => {
        this.closet = clothes;
        this.outfitSelectService.save('closet', this.closet);
        // this.chooseOutfit();
        this.outfitSelectService.setMock();
        this.outfitSelectService.chooseMatchingOutfit(null, null);
        this.outfit = this.outfitSelectService.getOutfit();
        this.isLoading = false;
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

  getRandomIndex = max => {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * maxInt);
  };

  chooseOutfit = () => {
    // copy closet and filter by category
    const tops = [...this.closet].filter((clothing) => clothing['id_category'] === 2);
    const onePieces = [...this.closet].filter((clothing) => clothing['id_category'] === 1);
    const outerwears = [...this.closet].filter((clothing) => clothing['id_category'] === 4);
    const accessories = [...this.closet].filter((clothing) => clothing['id_category'] === 5);
    const bottoms = [...this.closet].filter((clothing) => clothing['id_category'] === 3);
    const shoes = [...this.closet].filter((clothing) => clothing['id_category'] === 6);

    this.outfit = {
      top: tops[this.getRandomIndex(tops.length)],
      onePiece: onePieces[this.getRandomIndex(onePieces.length)],
      outerwear: outerwears[this.getRandomIndex(outerwears.length)],
      accessory: accessories[this.getRandomIndex(accessories.length)],
      bottom: bottoms[this.getRandomIndex(bottoms.length)],
      shoes: shoes[this.getRandomIndex(shoes.length)],
    };

    this.outfitSelectService.saveOutfit(this.outfit);

  }

  retrieveOutfit() {
    console.log(this.outfitSelectService.getOutfit());
  }
}
