import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherConditions } from '../../weather-conditions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = `http://localhost:8080`;

  constructor(private httpClient: HttpClient) {}

  public currentConditions: object = {};

  getConditions(callback) {
    this.httpClient.get(`${this.apiURL}/weather`).subscribe((data) => {
    callback(data);
    });
  }

  addClothingItem(callback) {
    this.httpClient.post(`${this.apiURL}/closet/1`, {
      id_category: 1,
      price: 120,
      id_image: 1,
      count_worn: 0,
    }).subscribe((data) => {
      callback(data);
    });
  }

  getCloset(callback) {
    this.httpClient.get(`${this.apiURL}/closet/1`).subscribe((data) => {
      callback(data);
    });
  }
}
