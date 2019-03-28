import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

const condition = { condition: 'test' };

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3sell.html',
  styleUrls: ['tab3sell.scss']
})
export class Tab3Sell implements OnInit {
  parsedLocalStorage: any;
  firstItemInObjectKey: any;
  firstItemInObjectValue: any;
  filteredCloset: any;
  pricePaid: any;
  redirect: any;
  title:string;
  description:string;
  condition:string = condition.condition;
  listingPrice:string;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.parsedLocalStorage = JSON.parse(localStorage.getItem('itemsToSell'));
    console.log(this.parsedLocalStorage);
    this.firstItemInObjectKey = Object.keys(this.parsedLocalStorage)[0];
    this.firstItemInObjectValue = this.parsedLocalStorage[
      this.firstItemInObjectKey
    ];
    this.filteredCloset = this.firstItemInObjectValue.imageUrl;
    this.pricePaid = this.firstItemInObjectValue.price;
  }

  nextItem(){
    // Deletes the clothing item from the object
    delete this.parsedLocalStorage[this.firstItemInObjectKey];
    // If, after the deletion, there are no more clothing items in the array
    if(Object.keys(this.parsedLocalStorage).length === 0){
      // this.router.navigate(['../tabs/tab3']);
      localStorage.removeItem('itemsToSell');
    }

    this.apiService.deleteClothingItem(this.firstItemInObjectKey);
    // if there are items in the array
    // Go to the sell-on-ebay page
    // Display the new item to be sold



    // this.router.navigate(['/sell-on-ebay']);;

    // this.http.put(`https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/${this.firstItemInObjectKey}`, {
    //     "availability": {
    //       "shipToLocationAvailability": {
    //         "quantity": 1
    //       }
    //     },
    //     "condition": condition.condition,
    //     "product": {
    //       "title": this.title,
    //       "description": this.description,
    //       "mpn": "CHDHX-401",
    //       "imageUrls": [
    //         this.filteredCloset,
    //       ]
    //     }
    // }).subscribe((response) => {
    //   console.log(response);
    // });
  }

  conditionSelected(chosenInput){
    condition.condition = chosenInput;
    console.log(chosenInput);
    console.log(condition.condition);
  }

  test() {
    console.log(this.title);
    console.log(this.description);
    console.log(condition.condition);
    console.log(this.listingPrice);
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
        this.router.navigate(['home/tabs/tab3']);
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