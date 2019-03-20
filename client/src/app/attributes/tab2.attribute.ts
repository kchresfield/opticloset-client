import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { IonMenuToggle } from '@ionic/angular';

// This is my cheat for adding the data to the db lol
const allAttributes = {
  comfortable: false,
  heavy: false,
  professional: false,
  tight: false,
  short: false,
  long: false,
  basic: false,
  specialoccasion: false,
  light: false,
};

const allOccasions = {
  occasion: "",
};

const allPossibilities = [];

@Component({
  selector: 'app-tab2.attribute',
  templateUrl: 'tab2.attribute.html',
  styleUrls: ['tab2.attribute.scss'],

})
export class Tab2Attribute {
  apiURL = 'http://localhost:8080';
  price: string;
  info: any;
  categories: any;

  constructor(private apiService: ApiService, private httpClient: HttpClient) { }
  private buttonColor: string = "light";

  ngOnInit() {
    this.categories = JSON.parse(localStorage.getItem('response')).categories;
    this.categories;
    if (this.categories.includes("shirt") || this.categories.includes("blouse") || this.categories.includes("sleeve") || this.categories.includes("polo") || this.categories.includes("vest")) {
      allPossibilities.push('top');
    }
    if (this.categories.includes("skirt") || this.categories.includes("denim") || this.categories.includes("pants") || this.categories.includes("jean") || this.categories.includes("shorts") || this.categories.includes("bottom")) {
      allPossibilities.push('bottom');
    }
    if (this.categories.includes("dress") || this.categories.includes("romper") || this.categories.includes("pants") || this.categories.includes("jean") || this.categories.includes("shorts") || this.categories.includes("bottom")) {
      allPossibilities.push('one-piece');
    }
    if (this.categories.includes("coat") || this.categories.includes("jacket") || this.categories.includes("outerware") || this.categories.includes("kimono") || this.categories.includes("cardigan") || this.categories.includes("hoodie") || this.categories.includes("sweatshirt")) {
      allPossibilities.push('outerwear');
    }
    if (this.categories.includes("heels") || this.categories.includes("shoe") || this.categories.includes("sneaker") || this.categories.includes("flats") || this.categories.includes("boots") || this.categories.includes("footware") || this.categories.includes("foot")) {
      allPossibilities.push('shoes');
    }
    if (this.categories.includes("jewelry") || this.categories.includes("hat") || this.categories.includes("sneaker") || this.categories.includes("flats") || this.categories.includes("boots") || this.categories.includes("footware") || this.categories.includes("foot")) {
      allPossibilities.push('shoes');
    }
  }

  attributeItem(input) {
    if (allAttributes[input] === true) {
      allAttributes[input] = false;
    } else {
      allAttributes[input] = true;
    }
    // console.log(input);
    // console.log(allAttributes);
  };
  occasionItem(input) {
    allOccasions.occasion = input;
    // console.log(input)
  };


  addItem() {
    const selectedAttributesSavedChoices = [];
    const selectedAttributesNotFinalChoices = Object.keys(allAttributes).map((attribute) => {
      if (allAttributes[attribute] === true) {
        selectedAttributesSavedChoices.push(attribute);
      }
    });
    const selectedOccasion = allOccasions.occasion;
    const price = this.price;

    const clothesData = {
      selectedAttributesSavedChoices: selectedAttributesSavedChoices,
      selectedOccasion: selectedOccasion,
      price: price,
      count_worn: 0,

    };

    this.httpClient.post(`${this.apiURL}/closet/1`, clothesData).subscribe((data) => {
      console.log(data);
    });
  }

}