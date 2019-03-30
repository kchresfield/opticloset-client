import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { getLView } from '@angular/core/src/render3/state';
import { OutfitSelectService } from '../services/outfit-select.service';
import { UserService } from '../services/user/user.service';
import { Tab1Page } from '../tab1/tab1.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [ Tab1Page ]
})
export class TabsPage implements OnInit {
  data: any;
  temperature: any;
  conditions: any;
  sellList: any;
  sellArr = [];

  constructor(
    private apiService: ApiService, 
    private outfitSelectService: OutfitSelectService,
    public userService: UserService,
    public tab1Page: Tab1Page,
    public loadingController: LoadingController,
  ) {}
  ngOnInit() {
    this.getWeather();
    this.getCloset();
    this.getSellList();
    // this.getAddress();
  }

  // getAddress() {
  //   this.apiService.getLocation();
  // }

  getWeather() {
    this.apiService.getConditions(data => {
      this.temperature = Math.floor(data.temp);
      console.log(data.weather);
      if (data.weather.includes('rain')) {
        this.conditions = 'rainy';
      }
      if (data.weather.includes('cloud')) {
        this.conditions = 'cloud';
      }
      if (data.weather.includes('storm')) {
        this.conditions = 'thunderstorm';
      }
      if (data.weather.includes('sun') || data.weather.includes('clear')) {
        this.conditions = 'sunny';
      }
      this.apiService.save('conditions', this.conditions);
      this.apiService.save('temperature', this.temperature);
      this.apiService.save('username', 'Laura Pena');
      const self = this;
      setTimeout(function () {
        // self.presentLoadingWeather();
      }, 300);
    });
  }

  async presentLoadingWeather() {
    console.log(this.apiService.temperature, this.apiService.currentConditions)
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: `${this.apiService.temperature} and ${this.apiService.currentConditions}`,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  getCloset() {
    this.userService.getUser().then((profile) => {
      this.outfitSelectService.getClosetFromDB(profile['nickname'], 
      data => { // invoke the getClosetFromDBandSort method from outfitSelectService to
        this.outfitSelectService.save('closet', data); // save a regular closet on the service
        const sortedCloset = [...data];
        sortedCloset.sort((a, b) => {
          return a.count_worn - b.count_worn; // sort the closet from least worn to most worn
        });
        this.outfitSelectService.save('sortedCloset', sortedCloset); // save the sorted closet on the service
      });
    })
  }

  // gets sellList from local storage and saves it on service to be shared between components
  getSellList() {
    this.sellList = localStorage.getItem('itemsToSell');
    this.sellList = this.sellList ? JSON.parse(this.sellList) : {};
    Object.keys(this.sellList).forEach(id => {
      this.sellArr.push(this.sellList[id]);
    });
    this.outfitSelectService.save('sellArr', this.sellArr);
  }

  print() {
    console.log(this.outfitSelectService);
  }
}
