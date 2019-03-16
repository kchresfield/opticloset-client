import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherConditions } from '../../weather-conditions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://172.24.9.131:8080';

  constructor(private httpClient: HttpClient) {}

  public currentConditions: object = {};

  getConditions(callback) {
    this.httpClient.get(`${this.apiURL}/weather`).subscribe((data) => {
    console.log(data);
    callback(data);
    });
  }
}
