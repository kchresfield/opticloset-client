import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherConditions } from '../../weather-conditions';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8080';
  // apiURL = 'http://172.24.9.131:8080';
  // apiURL = 'http://ec2-3-17-178-179.us-east-2.compute.amazonaws.com:8080';
  conditions: any;
  temperature: any;
  userName: any;
  location: any;
  constructor(
    private httpClient: HttpClient,
    private geolocation: Geolocation
  ) {}

  public currentConditions: object = {};

  // weather API helpers to server
  async getConditions(callback) {
    const latLong = await this.getCoordinates();
    this.location = latLong;
    console.log(latLong, 'latLong');
    if (!latLong) {
      this.httpClient.get(`${this.apiURL}/weather`).subscribe(data => {
        callback(data);
      });
    }
    if (latLong) {
      this.httpClient
        .get(`${this.apiURL}/weather`, {
          params: {
            latitude: latLong['lat'].toString(),
            longitude: latLong['long'].toString()
          }
        })
        .subscribe(data => {
          callback(data);
        });
    }
  }

  getCoordinates() {
    return this.geolocation
      .getCurrentPosition()
      .then(resp => {
        return { lat: resp.coords.latitude, long: resp.coords.longitude };
      })
      .catch(error => {
        console.log('Error getting location:', error);
      });
  }

  addClothingItem(callback) {
    this.httpClient
      .post(`${this.apiURL}/closet/1`, {
        id_category: 1,
        price: 120,
        id_image: 1,
        count_worn: 0
      })
      .subscribe(data => {
        callback(data);
      });
  }

  deleteClothingItem(itemId) {
    console.log(itemId);
    return this.httpClient
      .request('delete', `${this.apiURL}/closet/1`, {
        body: {
          clothingItemId: itemId
        },
        responseType: 'text'
      });
  }

  updateClothingItem(item) {
    console.log(item);

    return this.httpClient
      .request('put', `${this.apiURL}/closet/1`, {
        body: item,
        responseType: 'text'
      });
      // .subscribe(result => {
      //   console.log(result);
      // });
  }

  getCloset(callback) {
    this.httpClient.get(`${this.apiURL}/closet/1`).subscribe(data => {
      callback(data);
    });
  }

  save(prop, value) {
    this[prop] = value;
  }

  get(prop) {
    return this[prop];
  }
}
