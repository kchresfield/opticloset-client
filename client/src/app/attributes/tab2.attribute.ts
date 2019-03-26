import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { IonMenuToggle, NavController } from '@ionic/angular';
import { LogService } from 'app/services/log/log.service';

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

const category = { category: true };

const allOccasions = {
  occasion: "",
};

const allPossibilities = [];
// const topTwoColors = [];
const arrOfSelectedColors = {color: "userInputColor"};


@Component({
  selector: 'app-tab2.attribute',
  templateUrl: 'tab2.attribute.html',
  styleUrls: ['tab2.attribute.scss'],

})
export class Tab2Attribute {
  apiURL = 'http://localhost:8080';
  price: string = JSON.parse(localStorage.getItem('response')).price;
  info: any;
  categories: any;
  finished = allPossibilities;
  colors: any;
  topTwoColors = this.topTwoColors;
  colorClicked:any;
  dropDownColors: any;
  url = JSON.parse(localStorage.getItem('response')).cleanUrl;
  imgId = JSON.parse(localStorage.getItem('response')).idOfTheImg;

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient,
    private logService: LogService,
    ) {
  }
  private buttonColor: string = "light";

  ngOnInit() {
    this.logService.log(JSON.parse(localStorage.getItem('response')));
    this.categories = JSON.parse(localStorage.getItem('response')).categories;
    this.info = this.categories.map((catagoryObj) => {
      return catagoryObj.name;
    })
    if (this.info.includes("shirt") || this.info.includes("blouse") || this.info.includes("sleeve") || this.info.includes("polo") || this.info.includes("vest")) {
      allPossibilities.push('top');
    }
    if (this.info.includes("skirt") || this.info.includes("denim") || this.info.includes("pants") || this.info.includes("jean") || this.info.includes("shorts") || this.info.includes("bottom")) {
      allPossibilities.push('bottom');
    }
    if (this.info.includes("dress") || this.info.includes("romper") || this.info.includes("pants") || this.info.includes("jean") || this.info.includes("shorts") || this.info.includes("bottom")) {
      allPossibilities.push('one-piece');
    }
    if (this.info.includes("coat") || this.info.includes("jacket") || this.info.includes("outerware") || this.info.includes("kimono") || this.info.includes("cardigan") || this.info.includes("hoodie") || this.info.includes("sweatshirt")) {
      allPossibilities.push('outerwear');
    }
    if (this.info.includes("heels") || this.info.includes("shoe") || this.info.includes("sneaker") || this.info.includes("flats") || this.info.includes("boots") || this.info.includes("footware") || this.info.includes("foot")) {
      allPossibilities.push('shoes');
    }
    if (this.info.includes("jewelry") || this.info.includes("hat") || this.info.includes("sneaker") || this.info.includes("flats") || this.info.includes("boots") || this.info.includes("footware") || this.info.includes("foot")) {
      allPossibilities.push('acc');
    }
    this.colors = JSON.parse(localStorage.getItem('response')).colorsOptions;
    this.colors.map((color) => {
      if (this.topTwoColors.length <= 1) {
        this.topTwoColors.push(color.label)
      }
    });
  }

  attributeItem(input) {
    if (allAttributes[input] === true) {
      allAttributes[input] = false;
    } else {
      allAttributes[input] = true;
    }
    console.log(input);
    console.log(allAttributes);
  };
  occasionItem(input) {
    allOccasions.occasion = input;
    console.log(input)
  };
  categorySelected(input){
    category.category = input.toLowerCase();
    console.log(input.toLowerCase());
  }

  colorUserClicked(input) {
    // if(arrOfColors.length <= 1){
    //   arrOfColors.push(colorValue);
    // }
    const colorNameInLowercase = input.toLowerCase();
      arrOfSelectedColors.color = colorNameInLowercase;
    
    console.log(arrOfSelectedColors);
  }


  addItem() {
    const arrOfAttrId = Object.keys(allAttributes).filter((attributeId) => {
      if(allAttributes[attributeId] ){
        return attributeId;
      }
    })
    // console.log(arrOfAttrId);
    const selectedOccasion = allOccasions.occasion;
    const price = this.price;

    const clothesData = {
      id_user: 1,
      id_category: category.category,
      price: price,
      id_img: 48, //this.imgId
      count_worn: 0,
      id_occasion: selectedOccasion,
      attribute: arrOfAttrId,
      color: arrOfSelectedColors.color,
    };
    console.log(clothesData);
    // this.httpClient.post(`localhost:8080/closet/1`, clothesData).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
