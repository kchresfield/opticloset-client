import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OutfitSelectService } from '../../services/outfit-select.service';
import { UserService } from '../../services/user/user.service';
import { HttpHeaders } from '@angular/common/http';


const condition = { condition: 'test' };


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3sell.html',
  styleUrls: ['tab3sell.scss'],
  // providers: [OutfitSelectService],
})
export class Tab3Sell implements OnInit {
  parsedLocalStorage: any = JSON.parse(localStorage.getItem('itemsToSell'));
  firstItemInObjectKey: any;
  firstItemInObjectValue: any;
  filteredCloset: any;
  pricePaid: any;
  redirect: any;
  title: string;
  description: string;
  condition: string = condition.condition;
  listingPrice: string;
  index: number;
  arr: any = this.outfitSelectService.get('sellArr').slice();
  parsedSelectedItemsToSell: any = JSON.parse(localStorage.getItem('selectedItemsToSell'));
  apiURL: string = 'http://172.24.0.217:8080';
  parsedPostedList: any = JSON.parse(localStorage.getItem('postedList'));

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router,
    private outfitSelectService: OutfitSelectService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.parsedLocalStorage = JSON.parse(localStorage.getItem('selectedItemsToSell'));
    this.firstItemInObjectKey = Object.keys(this.parsedLocalStorage)[0];
    this.firstItemInObjectValue = this.parsedLocalStorage[this.firstItemInObjectKey];
    this.filteredCloset = this.firstItemInObjectValue.imageUrl;
    this.pricePaid = this.firstItemInObjectValue.price;
    this.title = null;
    this.description = null;
    this.condition = null;
    this.listingPrice = null;
  }

  nextItem(){
    // Deletes the clothing item from the localstorage
    delete this.parsedLocalStorage[this.firstItemInObjectKey];
    delete this.parsedSelectedItemsToSell[this.firstItemInObjectKey];
    localStorage.setItem('itemsToSell', JSON.stringify(this.parsedLocalStorage));
    localStorage.setItem('selectedItemsToSell', JSON.stringify(this.parsedSelectedItemsToSell));
    
    // Deletes the clothing item from the tab3 page
    for (let i = 0; i < this.outfitSelectService.get('sellArr').length; i++) {
      if ((this.outfitSelectService.get('sellArr')[i].id_clothing_item).toString() === this.firstItemInObjectKey) {
        this.outfitSelectService.remove(i, 'sellArr');
      }
    }

    // Delete the clothing item from the closet
    for (let i = 0; i < this.outfitSelectService.get('closet').length; i++){
      if (this.outfitSelectService.get('closet')[i].id_clothing_item == this.firstItemInObjectKey){
        this.outfitSelectService.remove(i, 'closet');
      }
    }

    // Delete the clothing item from the tab4 page
    for (let i = 0; i < this.outfitSelectService.get('tab4Closet').length; i++) {
      if (this.outfitSelectService.get('tab4Closet')[i].id_clothing_item == this.firstItemInObjectKey) {
        this.outfitSelectService.remove(i, 'tab4Closet');
      }
    }

    // Deletes the clothing from the sorted closet
    for (let i = 0; i < this.outfitSelectService.get('sortedCloset').length; i++) {
      if (this.outfitSelectService.get('sortedCloset')[i].id_clothing_item == this.firstItemInObjectKey) {
        this.outfitSelectService.remove(i, 'sortedCloset');
      }
    }


    this.userService.getUser().then((profile) => {
      this.http.patch(`${this.apiURL}/closet/${profile['nickname']}/sell`, {
        "clothingId" : this.firstItemInObjectKey,
      })
      .toPromise()
      .then((response) => {
        console.log(response)})
      .catch((err) => {
        console.log(err)})
    })
  
//sku, title, description, condition, image
    this.http.put(`${this.apiURL}/ebayPost`, {
      title: this.title,
      description: this.description,
      image: this.filteredCloset,
      condition: condition.condition,
      sku: this.firstItemInObjectKey,
    }).subscribe((response) => {
      console.log(response);
    });


    // Adding information to the localstorage
    this.parsedPostedList[this.firstItemInObjectKey] = {
        title: this.title,
        description: this.description,
        image: this.filteredCloset,
        pricePosted: this.listingPrice,
        id: this.firstItemInObjectKey,
    };

    // Adds item to the local storage
    localStorage.setItem('postedList', JSON.stringify(this.parsedPostedList));

    // Add items to the posted-list property
    this.outfitSelectService.add('postedList', {
      title: this.title,
      description: this.description,
      image: this.filteredCloset,
      pricePosted: this.listingPrice,
      id: this.firstItemInObjectKey,
    });

    if(Object.keys(this.parsedSelectedItemsToSell).length === 0 || this.parsedSelectedItemsToSell === undefined || this.parsedSelectedItemsToSell === null){
      // localStorage.removeItem('itemsToSell');
      localStorage.removeItem('selectedItemsToSell');
      this.router.navigate(['home/tabs/tab3']);
    } else {
      // Go back to the sell page to sell the rest of the clothes
      console.log(Object.keys(this.parsedSelectedItemsToSell).length, '11111111111111111');
      this.ngOnInit();
      this.router.navigate(['home/tabs/tab3/sell-on-ebay']);
    }
  }

  conditionSelected(chosenInput){
    condition.condition = chosenInput;
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Published on eBay!',
      position: 'middle',
      animated: true,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Are you sure?',
    // subHeader: 'Once sold you will have to manually re-add your item if you change your mind',
    message: 'Once sold your item will be deleted from your closet.',
    // "No, keep it", "I'm sure"
    buttons: [
      {
      text: 'Edit',
      handler: () => {
      }
      }, {
      text: 'No, keep it',
      handler: () => { 
        this.router.navigate(['home/tabs/tab3']);
      }
      }, {
      text: 'I\'m sure',
      handler: () => {
        this.nextItem();
        this.presentToast()
        // this.router.navigate(['home/tabs/tab3']);
      }
      }],
  });
  return await alert.present();
}

}
// buttons: [
//   {
//     text: 'New note',
//     handler: () => {
//       this.navCtrl.push(NewNotesPage);
//     }
//   },
//   {
//     text: 'See notes',
//     handler: () => {
//       this.navCtrl.push(SeeNotesPage);
//     }
//   }
// ]