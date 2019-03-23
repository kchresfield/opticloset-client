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

  // retrieve closet from DB using apiService
  getClosetFromDB(cb) {
    this.apiService.getCloset(cb);
  }

  // to save outfit from tab1
  saveOutfit(outfit) {
    this.outfit = outfit;
  }

  // update the outfit of the day with an item from modal
  set(category, item) {
    this.outfit[category] = item;
  }

  // return the current outfit of the day
  getOutfit() {
    return this.outfit;
  }


  // save initial value of a collection on the service
  save(prop, value) {
    this[prop] = value;
  }

  // returns the value of a collection on the service
  get(prop) {
    return this[prop];
  }

  // replace a collection by a single item
  change(prop, item) {
    this[prop].unshift(item);
    this[prop].splice(1, this[prop].length);
  }

  // function to update either closet or sortetCloset on outfitSelect service from components
  restore(prop, array) {
    this[prop].splice(0, this[prop].length);
    array.forEach(item => {
      this[prop].push(item);
    });
  }
}
