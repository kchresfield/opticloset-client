import { Injectable, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class OutfitSelectService {
  outfit: any;
  selectedItem: any;
  closet: any;
  constructor(public apiService: ApiService) {}

  // getClosetFromDB() {
  //   this.apiService.getCloset(data => {
  //     console.log('getting closet with Api Service', data);
  //     this.closet = data;
  //   });
  // }

  // retrieve closet from DB using apiService
  getClosetFromDB(cb) {
    this.apiService.getCloset(cb);
  }

  // to save outfit from tab1
  saveOutfit(outfit) {
    this.outfit = outfit;
  }

  // @Output() change: EventEmitter<boolean> = new EventEmitter();

  // update the outfit of the day with an item from modal
  set(category, item) {
    this.outfit[category] = item;
  }

  // return the current outfit of the day
  getOutfit() {
    return this.outfit;
  }

  // saveItem(item) {
  //   this.selectedItem = item;
  // }
  save(prop, value) {
    this[prop] = value; // bad because reassignment not changing the value
  }

  get(prop) {
    return this[prop];
  }

  change(prop, value) {
    this[prop].unshift(value);
    this[prop].splice(1, this[prop].length);
  }

  restore(prop, array) {
    // console.log(this[prop]);
    this[prop].splice(0, this[prop].length);
    array.forEach(item => {
      this[prop].push(item);
    });
  }
}
