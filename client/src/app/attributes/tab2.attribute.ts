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

@Component({
  selector: 'app-tab2.attribute',
  templateUrl: 'tab2.attribute.html',
  styleUrls: ['tab2.attribute.scss'],

})
export class Tab2Attribute {
  apiURL = 'http://localhost:8080';
  price: string;

  constructor(private apiService: ApiService, private httpClient: HttpClient) { }
  private buttonColor: string = "light"; 

  attributeItem(input){ 
    if (allAttributes[input] === true){
      allAttributes[input] = false;
    } else {
      allAttributes[input] = true;
    }
    // console.log(input);
    // console.log(allAttributes);
  }; 
  occasionItem(input){
    allOccasions.occasion = input;
    // console.log(input)
  };


  addItem() {
    const selectedAttributesSavedChoices = [];
    const selectedAttributesNotFinalChoices = Object.keys(allAttributes).map((attribute) => {
      if (allAttributes[attribute] === true){
        selectedAttributesSavedChoices.push(attribute);
      }
    });
    const selectedOccasion = allOccasions.occasion;
    const price = this.price;

    const clothesData = { selectedAttributesSavedChoices: selectedAttributesSavedChoices, selectedOccasion: selectedOccasion, price:price};
    
    this.httpClient.post(`${this.apiURL}/closet/1`, clothesData).subscribe((data) => {
      console.log(data);
    });
  }

}