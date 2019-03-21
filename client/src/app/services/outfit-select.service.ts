import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutfitSelectService {
  outfit: any;
  constructor() {}


  // to save outfit from tab1
  saveOutfit(outfit) {
    this.outfit = outfit;
  }

  // @Output() change: EventEmitter<boolean> = new EventEmitter();

  // update the outfit of the day with an item from modal
  set(category, item) {
    this.outfit[category] = item;
    console.log(this);
  }

  // return the current outfit of the day
  getOutfit() {
    return this.outfit;
  }

  // helper functions for colormatching algo

  getRandomIndex(max) {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * maxInt);
  };

  colorMatch(arrayOfClothingObjs) {
    return 'colormatch'
  }

  monochromatic(arrayOfClothingObjs) {
    return 'mono'
  }

  allNeutral(arrayOfClothingObjs) {
    return 'neutrals'
  }

  checkWeather() {
    //remember to import weather apiservice for weather
  }

  checkOccasion() {

  }

  chooseMatchMethod() {
    const methods = ['colorMatch', 'monochromatic', 'allNeutral'];
    const randomMethod = methods[this.getRandomIndex(methods.length)];
    return randomMethod;
  }

  // colormatching algo
  chooseMatchingOutfit(method) {
    //choose color method

  }
}
