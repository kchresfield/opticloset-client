import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { LogService } from 'app/services/log/log.service';
import { Router } from '@angular/router';
import { OutfitSelectService } from '../services/outfit-select.service';


// This is my cheat for adding the data to the db lol
const allAttributes = {
  long: false,
  short: false,
  light: false,
  heavy: false,
  tight: false,
  loose: false,
  comfortable: false,
  basic: false,
  shiny: false,
  solid: false,
  patterned: false
};

const allColors = {
  Red: false,
  Pink: false,
  Orange: false,
  Yellow: false,
  Green: false,
  Blue: false,
  Purple: false,
  White: false,
  Black: false,
  Brown: false,
  Gray: false,
};


const category = { category: "" };
const allOccasions = {occasion: ""};
const allPossibilities = [];
const topTwoColors = [];


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
  topTwoColors = topTwoColors;
  colorClicked: any;
  dropDownColors: any;
  url = JSON.parse(localStorage.getItem('response')).cleanUrl;
  imgId = JSON.parse(localStorage.getItem('response')).idOfTheImg;

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient,
    private logService: LogService,
    private router: Router,
    private outfitSelectService: OutfitSelectService,
    ) { }

  buttonColors = {
    long: 'light',
    short: 'light',
    light: 'light',
    heavy: 'light',
    tight: 'light',
    loose: 'light',
    comfortable: 'light',
    basic: 'light',
    shiny: 'light',
    solid: 'light',
    patterned: 'light',
    Red: 'light',
    Pink: 'light',
    Orange: 'light',
    Yellow: 'light',
    Green: 'light',
    Blue: 'light',
    Purple: 'light',
    White: 'light',
    Black: 'light',
    Brown: 'light',
    Gray: 'light',
  };

  buttonOccasion = {
    casual: 'light',
    formal: 'light',
    business: 'light',
    goingOut: 'light',
    athletic: 'light',
  }

  ngOnInit() {
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
      if (topTwoColors.length <= 1) {
        topTwoColors.push(color.label)
      }
    });
  }

  attributeItem(input) {
    if (allAttributes[input] === true) {
      allAttributes[input] = false;
    } else {
      allAttributes[input] = true;
    }

    if (this.buttonColors[input] === 'light') {
      this.buttonColors[input] = 'primary';
    } else {
      this.buttonColors[input] = 'light';
    }
  };

  occasionItem(input, occasion) {
    allOccasions.occasion = input;
    if (this.buttonOccasion[occasion] === 'light') {
      for (let key in this.buttonOccasion) {
        this.buttonOccasion[key] = "light"
      }
      this.buttonOccasion[occasion] = 'primary';
    } else {
      this.buttonOccasion[occasion] = 'light';
    }
    console.log(input)
  };
  
  categorySelected(input){
    category.category = input.toLowerCase();
    console.log(input.toLowerCase());
    if (this.buttonColors[input] === 'light') {
      this.buttonColors[input] = 'primary';
    } else {
      this.buttonColors[input] = 'light';
    }
  }

  colorUserClicked(input) {
    if(!allColors[input]){
      allColors[input] = true;
    }
    else allColors[input] = false;
    
  }


  addItem() {
    const arrOfAttrId = Object.keys(allAttributes).filter((attributeId) => {
      if(allAttributes[attributeId] ){
        return attributeId;
      }
    })

    const arrOfColors = Object.keys(allColors).filter((color) => {
      if(allColors[color]){
        return color;
      }
    })

    const selectedOccasion = allOccasions.occasion;
    const price = this.price;
    const clothesData = {
      id_user: 1,
      id_category: parseInt(category.category),
      price: parseInt(price),
      id_image: this.imgId,
      count_worn: 0,
      id_occasion: parseInt(selectedOccasion),
      attribute: arrOfAttrId.join(', '),
      color: JSON.stringify(arrOfColors),
    };
    
    // this.logService.log((clothesData));
    this.httpClient.post(`${this.apiService.apiURL}/closet/1`, {
      id_user: 1,
      id_category: parseInt(category.category),
      price: parseInt(price),
      id_image: this.imgId,
      count_worn: 0,
      id_occasion: parseInt(selectedOccasion),
      attribute: arrOfAttrId.join(', '),
      color: JSON.stringify(arrOfColors),
    }).toPromise()
    .then(() => {
      this.outfitSelectService.add('closet', clothesData);
      this.logService.log(this.outfitSelectService);
    })
    .then(() => {
      this.router.navigate(['/home/tabs/tab2'])
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
