import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


// const parsedLocalStorage = 
// const firstItemInObjectKey = Object.keys(parsedLocalStorage)[0];
// const firstItemInObjectValue = parsedLocalStorage[firstItemInObjectKey];


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3sell.html',
  styleUrls: ['tab3sell.scss']
})
export class Tab3Sell {
  parsedLocalStorage:any;
  firstItemInObjectKey:any;
  firstItemInObjectValue:any;
  filteredCloset: any;
  pricePaid: any;
  redirect: any;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
    this.parsedLocalStorage = JSON.parse(localStorage.getItem('itemsToSell'));
    this.firstItemInObjectKey = Object.keys(this.parsedLocalStorage)[0];
    this.firstItemInObjectValue = this.parsedLocalStorage[this.firstItemInObjectKey];
    this.filteredCloset = this.firstItemInObjectValue.imageUrl;
    this.pricePaid = this.firstItemInObjectValue.price;
  }

  nextPageAndToast(){
    
  }
  nextItem(){
    delete this.parsedLocalStorage[this.firstItemInObjectKey];
    if(this.parsedLocalStorage.length === 0){
      this.redirect = '../tabs/tab3';
    }
    this.redirect = '/sell-on-ebay';

    // this.http.put(`https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/${this.firstItemInObjectKey}`, {
    //     "availability": {
    //       "shipToLocationAvailability": {
    //         "quantity": 1
    //       }
    //     },
    //     "condition": "NEW",
    //     "product": {
    //       "title": "GoPro Hero4 Helmet Cam",
    //       "description": "New GoPro Hero4 Helmet Cam. Unopened box.",
    //       "aspects": {
    //         "Brand": ["GoPro"],
    //         "Type": ["Helmet/Action"],
    //         "Storage Type": ["Removable"],
    //         "Recording Definition": ["High Definition"],
    //         "Media Format": ["Flash Drive (SSD)"],
    //         "Optical Zoom": ["10x"]
    //       },
    //       "brand": "GoPro",
    //       "mpn": "CHDHX-401",
    //       "imageUrls": [
    //         "http://i.ebayimg.com/images/i/182196556219-0-1/s-l1000.jpg",
    //       ]
    //     }
    // }).subscribe((response) => {
    //   console.log(response);
    // });

    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Published!',
      position: 'middle',
      animated: true,
      duration: 2000
    });
    toast.present();
  }

}