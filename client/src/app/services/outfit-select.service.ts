import { Injectable, Output, EventEmitter } from '@angular/core';
import { mockCloset } from './mockClosetData.js';
import { ApiService } from '../services/api/api.service';
import { UserService } from '../services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class OutfitSelectService {
  outfit: any;
  closet: any;
  selectedItem: any;

  tops: any;
  bottoms: any;
  outerwears: any;
  onePieces: any;
  accessories: any;
  shoes: any;

  temp: Number;
  
  constructor(
    public apiService: ApiService,
    public userService: UserService,
  ) {}

  // retrieve closet from DB using apiService
  getClosetFromDB(username, cb) {
    this.apiService.getCloset(username, cb);
  }

  // to save outfit from tab1
  saveOutfit(outfit) {
    this.outfit = outfit;
  }

  // update the outfit of the day with an item from modal
  set(category, item) {
    this.outfit[category] = item;
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

  // add item to array on service
  add(prop, item) {
    let exist = false;
    this[prop].forEach((sellItem) => {
      if (sellItem.id_clothing_item === item.id_clothing_item) {
        exist = true;
      }
    });

    if (exist === false) {
      this[prop].push(item);
    }
  }

  empty(prop) {
    this[prop].splice(0, this[prop].length);
  }
  // return the current outfit of the day
  getOutfit() {
    return this.outfit;
  }

  setMock() {
    // this.closet = mockCloset;
    this.shuffle(this.closet);
    this.tops = this.closet.filter(clothing => clothing['id_category'] === 2);
    console.log(`Tops length is ${this.tops.length}`);
    this.onePieces = this.closet.filter(
      clothing => clothing['id_category'] === 1
    );
    console.log(`onePieces length is ${this.onePieces.length}`);
    this.outerwears = this.closet.filter(
      clothing => clothing['id_category'] === 4
    );
    console.log(`outerwears length is ${this.outerwears.length}`);
    this.accessories = this.closet.filter(
      clothing => clothing['id_category'] === 5
    );
    console.log(`accessories length is ${this.accessories.length}`);
    this.bottoms = this.closet.filter(
      clothing => clothing['id_category'] === 3
    );
    console.log(`bottoms length is ${this.bottoms.length}`);
    this.shoes = this.closet.filter(clothing => clothing['id_category'] === 6);
    console.log(`shoes length is ${this.shoes.length}`);
  }

  // helper functions for colormatching algo

  shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  // returns random whole number from 0 to max
  getRandomIndex(max) {
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * maxInt);
  }

  // selects random match method
  chooseMatchMethod() {
    const methods = ['colorMatch', 'monochromatic', 'allNeutral'];
    const randomMethod = methods[this.getRandomIndex(methods.length)];
    return randomMethod;
  }

  // selects random occasion
  chooseOccasion() {
    const occasions = ['casual', 'formal', 'business', 'goingOut', 'athletic'];
    const randomOccasion = occasions[this.getRandomIndex(occasions.length)];
    return randomOccasion;
  }

  // define matching colors
  // takes in color and returns array of 'matching' colors
  chooseMatchingColors(color) {
    const red = ['green', 'yellow', 'blue'];
    const orange = ['green', 'blue', 'purple'];
    const yellow = ['red', 'blue', 'purple'];
    const green = ['orange', 'blue', 'purple'];
    const blue = ['yellow', 'green', 'orange'];
    const purple = ['yellow', 'green', 'orange'];
    if (color === 'red' || color === 'pink') {
      return red;
    }
    if (color === 'orange') {
      return orange;
    }
    if (color === 'yellow') {
      return yellow;
    }
    if (color === 'green') {
      return green;
    }
    if (color === 'blue') {
      return blue;
    }
    if (color === 'purple') {
      return purple;
    }
  }

  // checks if color is neutral
  //takes in a color and returns a boolean on if color is neutral or not
  isNeutral(color) {
    return ['black', 'grey', 'white', 'tan'].includes(color);
  }

  // returns outfit object with up to two matching colors in palette
  colorMatch() {
    const colorOutfit = {};
    // select random top
    let randoIndex = this.getRandomIndex(this.tops.length);
    console.log(randoIndex);
    let currPiece = this.tops[randoIndex];
    console.log(currPiece);
    // declare matchingColors variable
    let matchingColors;
    // current color
    let currColor = currPiece.color.split(', ')[0];
    // check if current color is neutral and if matching colors have been selected
    if (!this.isNeutral(currColor) && !matchingColors) {
      // if current color isn't neutral, then matching colors are assigned
      matchingColors = this.chooseMatchingColors(currColor);
    }
    // assign top
    colorOutfit['top'] = currPiece;

    // loop through bottoms to select matching bottom by color
    for (
      let i = this.getRandomIndex(this.bottoms.length);
      i < this.bottoms.length;
      i++
    ) {
      console.log(`Color bottoms index is ${i}`);
      // check if matching colors have been selected
      if (matchingColors) {
        // if matching colors have been selected, then check if current bottom's color is considered matching
        if (matchingColors.includes(this.bottoms[i].color)) {
          // if so, assign bottom to outfit
          colorOutfit['bottom'] = this.bottoms[i];
          currPiece = colorOutfit['bottom'];
          currColor = currPiece.color.split(', ')[0];
          break;
        }
        //if not, do nothing and move to next bottom
      }
    }
    // if loop completes and no matching top has been selected, choose random bottom
    if (!colorOutfit['bottom']) {
      colorOutfit['bottom'] = this.bottoms[
        this.getRandomIndex(this.bottoms.length)
      ];
      currPiece = colorOutfit['bottom'];
      currColor = currPiece.color.split(', ')[0];
    }
    // after bottom is assigned, check if matching colors are assigned and check if current color is not neutral
    if (!matchingColors && !this.isNeutral(currColor)) {
      // if colros are not assigned and current color not neutral, assign matching colors
      matchingColors = this.chooseMatchingColors(currColor);
    }

    // loop through outerwears to select matching bottom by color
    for (
      let j = this.getRandomIndex(this.outerwears.length);
      j < this.outerwears.length;
      j++
    ) {
      console.log(`Color outerwears index is ${j}`);
      // check if current bottom matches top by color
      if (matchingColors) {
        if (matchingColors.includes(this.outerwears[j].color)) {
          colorOutfit['outerwear'] = this.outerwears[j];
          currPiece = colorOutfit['outerwear'];
          currColor = currPiece.color.split(', ')[0];
          break;
        }
      }
    }

    if (!colorOutfit['outerwear']) {
      colorOutfit['outerwear'] = this.outerwears[
        this.getRandomIndex(this.outerwears.length)
      ];
      currPiece = colorOutfit['outerwear'];
      currColor = currPiece.color.split(', ')[0];
    }

    if (!this.isNeutral(currColor) && !matchingColors) {
      matchingColors = this.chooseMatchingColors(currColor);
    }

    for (
      let k = this.getRandomIndex(this.shoes.length);
      k < this.shoes.length;
      k++
    ) {
      console.log(`Color shoes index is ${k}`);
      // check if current shoes matches top by color
      if (matchingColors) {
        if (matchingColors.includes(this.shoes[k].color)) {
          colorOutfit['shoes'] = this.shoes[k];
          currPiece = colorOutfit['shoes'];
          currColor = currPiece.color.split(', ')[0];
          break;
        }
      }
    }

    if (!colorOutfit['shoes']) {
      colorOutfit['shoes'] = this.shoes[this.getRandomIndex(this.shoes.length)];
      currPiece = colorOutfit['shoes'];
      currColor = currPiece.color.split(', ')[0];
    }

    if (!this.isNeutral(currColor) && !matchingColors) {
      matchingColors = this.chooseMatchingColors(currColor);
    }

    for (
      let l = this.getRandomIndex(this.accessories.length);
      l < this.accessories.length;
      l++
    ) {
      console.log(`Color accessories index is ${l}`);
      // check if current accessory matches top by color
      if (matchingColors) {
        if (matchingColors.includes(this.accessories[l].color)) {
          colorOutfit['accessory'] = this.accessories[l];
          currPiece = colorOutfit['accessory'];
          currColor = currPiece.color.split(', ')[0];
          break;
        }
      }
    }
    if (!colorOutfit['accessory']) {
      colorOutfit['accessory'] = this.accessories[
        this.getRandomIndex(this.accessories.length)
      ];
      currPiece = colorOutfit['accessory'];
      currColor = currPiece.color.split(', ')[0];
    }

    console.log('matching colors', matchingColors);
    return colorOutfit;
  }

  // returns outfit object with one color for every clothing item
  monochromatic() {
    // object to hold current outfit being built
    const monoOutfit = {};
    // start with random top
    const starterpiece = this.tops[this.getRandomIndex(this.tops.length)];
    // get color from top - NOTE TO LAURA - AMEND LATER TO CHOOSE EITHER FIRST OR SECOND COLOR
    const color = starterpiece.color.split(', ')[0];
    // assign top to current outfit
    monoOutfit['top'] = starterpiece;

    // loop through bottoms to select matching bottom by color
    for (
      let i = this.getRandomIndex(this.bottoms.length);
      i < this.bottoms.length;
      i++
    ) {
      console.log(`Mono bottoms index is ${i}`);
      // check if current bottom matches top by color
      if (this.bottoms[i].color.includes(color)) {
        monoOutfit['bottom'] = this.bottoms[i];
        break;
      }
    }
    if (!monoOutfit['bottom']) {
      monoOutfit['bottom'] = this.bottoms[this.getRandomIndex(this.bottoms.length)];
    }
    
    // loop through outwears to select matching outerwears by color
    for (
      let i = this.getRandomIndex(this.outerwears.length);
      i < this.outerwears.length;
      i++
    ) {
      console.log(`Mono outerwears index is ${i}`);
      // check if current outerwear matches top by color
      if (this.outerwears[i].color.includes(color)) {
        monoOutfit['outerwear'] = this.outerwears[i];
        break;
      }
    }
    if (!monoOutfit['outerwear']) {
      monoOutfit['outerwear'] = this.outerwears[this.getRandomIndex(this.outerwears.length)];
    }
    
    monoOutfit['shoes'] = this.shoes[this.getRandomIndex(this.shoes.length)]
    monoOutfit['accessory'] = this.accessories[this.getRandomIndex(this.accessories.length)]
    
    return monoOutfit;
  }

  // returns outfit object with any number of colors included in the 'neutrals' array
  allNeutral() {
    const neutralOutfit = {};

    // get and assign neutral top
    for (
      let i = this.getRandomIndex(this.tops.length);
      i < this.tops.length;
      i++
    ) {
      console.log(`Neutral tops index is ${i}`);
      if (this.isNeutral(this.tops[i].color)) {
        neutralOutfit['top'] = this.tops[i];
        break;
      }
    }
    if (!neutralOutfit['top']) {
      neutralOutfit['top'] = this.tops[this.getRandomIndex(this.tops.length)];
    }
    
    // get and assign neutral bottom
    for (
      let i = this.getRandomIndex(this.bottoms.length);
      i < this.bottoms.length;
      i++
    ) {
      console.log(`Neutral bottoms index is ${i}`);
      if (this.isNeutral(this.bottoms[i].color)) {
        neutralOutfit['bottom'] = this.bottoms[i];
        break;
      }
    }

    if (!neutralOutfit['bottom']) {
      neutralOutfit['bottom'] = this.bottoms[this.getRandomIndex(this.bottoms.length)];
    }
    
    // get and assign neutral outerwear
    for (
      let i = this.getRandomIndex(this.outerwears.length);
      i < this.outerwears.length;
      i++
    ) {
      console.log(`Neutral outerwears index is ${i}`);
      if (this.isNeutral(this.outerwears[i].color)) {
        neutralOutfit['outerwear'] = this.outerwears[i];
        break;
      }
    }

    if (!neutralOutfit['outerwear']) {
      neutralOutfit['outerwear'] = this.outerwears[this.getRandomIndex(this.outerwears.length)];
    }

    neutralOutfit['shoes'] = this.shoes[this.getRandomIndex(this.shoes.length)]
    neutralOutfit['accessory'] = this.accessories[this.getRandomIndex(this.accessories.length)]
    
    return neutralOutfit;
  }

  checkWeather() {
    //remember to import weather apiservice for weather
    
    if (this.temp <= 60) {
      this.tops = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.onePieces = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.outerwears = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.accessories = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.bottoms = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.shoes = this.closet.filter(
        clothing => ['heavy', 'long'].some(attribute => clothing.includes(attribute))
      );
    }
    if (this.temp > 60 && this.temp <= 70) {
      this.tops = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.onePieces = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.outerwears = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.accessories = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.bottoms = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
      this.shoes = this.closet.filter(
        clothing => ['light', 'long'].some(attribute => clothing.includes(attribute))
      );
    }
    if (this.temp > 70 && this.temp <= 80) {
      // prime weather, entire closet is available
    }
    if (this.temp > 80) {
      this.tops = this.tops.filter(
        clothing => ['light', 'short', 'loose'].some(attribute => clothing.includes(attribute))
      );
      this.onePieces = this.onePieces.filter(
        clothing => ['light', 'short', 'loose'].some(attribute => clothing.includes(attribute))
      );
      this.outerwears = this.outerwears.filter(
        clothing => ['light', 'short', 'loose'].some(attribute => clothing.includes(attribute))
      );
      this.bottoms = this.bottoms.filter(
        clothing => ['light', 'short', 'loose'].some(attribute => clothing.includes(attribute))
      );
    }
  }

  // filters closet by occasion, returns new array of clothingItem objects
  filterByOccasion(occasion) {
    const occasions = {
      casual: 1,
      formal: 2,
      business: 3,
      goingOut: 4,
      athletic: 5,
    }

    this.tops = this.tops.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
    );
    if (this.tops.length === 0) {
      this.tops = this.closet.filter(clothing => clothing['id_category'] === 2);
    }

    this.onePieces = this.onePieces.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
    );

    if (this.onePieces.length === 0) {
      this.onePieces = this.closet.filter(clothing => clothing['id_category'] === 1);
    }
    
    this.outerwears = this.outerwears.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
      );

    if (this.outerwears.length === 0) {
      this.outerwears = this.closet.filter(clothing => clothing['id_category'] === 4);
    }
    
    this.accessories = this.accessories.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
      );
    if (this.accessories.length === 0) {
      this.accessories = this.closet.filter(clothing => clothing['id_category'] === 5);
    }
    
    this.bottoms = this.bottoms.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
      );
    if (this.bottoms.length === 0) {
      this.bottoms = this.closet.filter(clothing => clothing['id_category'] === 3);
    }
    
    this.shoes = this.shoes.filter(
      clothing => clothing['id_occasion'] === occasions[occasion]
      );
    if (this.shoes.length === 0) {
      this.shoes = this.closet.filter(clothing => clothing['id_category'] === 6);
    }
    }

  // select matching outfit
  // takes in match method and reassigns OOTD to outfit with that method
  // order of selection: occasion => weather => matching
  chooseMatchingOutfit(method, occasion) {
    // if no method is selected, select random matching method
    if (!method || method === 'random') {
      method = this.chooseMatchMethod();
      console.log(`Random match method is ${method}`);
    }
    // if no occasion is selected, select random occasion
    if (!occasion || method === 'random') {
      occasion = this.chooseOccasion();
      console.log(`Random occasion method is ${occasion}`);
    }

    this.filterByOccasion(occasion);

    // current outfit selected by method
    const currOutfitSelection = this[method]();

    // reassign outfit to be outfit chosen by method
    this.outfit = currOutfitSelection;
    console.log(this.outfit, 'Outfit selected');
    
    this.setMock();
  }
}
