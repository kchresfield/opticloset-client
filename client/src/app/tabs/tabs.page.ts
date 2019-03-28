import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { getLView } from '@angular/core/src/render3/state';
import { OutfitSelectService } from '../services/outfit-select.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
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
  ) {}
  ngOnInit() {
    this.getWeather();
    this.getCloset();
    this.getSellList();
  }

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
    });
  }

  getCloset() {
    this.outfitSelectService.getClosetFromDB(this.userService.profile['nickname'], data => { // invoke the getClosetFromDBandSort method from outfitSelectService to
      this.outfitSelectService.save('closet', data); // save a regular closet on the service
      const sortedCloset = [...data];
      sortedCloset.sort((a, b) => {
        return a.count_worn - b.count_worn; // sort the closet from least worn to most worn
      });
      sortedCloset.forEach(clothing => { // for each item in the sorted closet
        clothing.lastUpdated = new Date(clothing.updatedAt).toString().slice(3, 15); // add a property lastUpdated
      });
      this.outfitSelectService.save('sortedCloset', sortedCloset); // save the sorted closet on the service
    });
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
}
