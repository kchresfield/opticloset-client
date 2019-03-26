import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { OutfitSelectService } from '../../services/outfit-select.service';
import { ToastController } from '@ionic/angular';
import { ItemOptionsModalModule } from 'app/modals/item-options-modal/item-options-modal.module';
import { ApiService } from '../../services/api/api.service';


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


const category = {
  '1': 'one-piece',
  '2': 'top',
  '3': 'bottom',
  '4': 'outerwear',
  '5': 'accessory',
  '6': 'shoes'
};

const occasions = {
  '1': 'casual',
  '2': 'formal',
  '3': 'business',
  '4': 'goingOut',
  '5': 'athletic'
};


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
  providers: [ToastController]
})
export class UpdateItemPage implements OnInit {
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
    casual: 'light',
    formal: 'light',
    business: 'light',
    goingOut: 'light',
    athletic: 'light'
  };

  allAttributes = {
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

  allOccasions = {
    casual: false,
    formal: false,
    business: false,
    goingOut: false,
    athletic: false
  };

  chosenColor: any;
  chosenCategory: any;
  selectedItem: any;
  selectedAttributes = [];
  selectedOccasions = [];
  selectedOccasionID: any;
  selectedColors = [];
  selectedCategory = [];
  selectedCategoryID: any;
  allPossibilities = [];
  updatedItem = {};
  finished = this.allPossibilities;
  arrOfSelectedColors = { color: 'userInputColor' };
  initialprice: any;
  price: any;

  constructor(
    public toastController: ToastController,
    private outfitSelectService: OutfitSelectService,
    private apiService: ApiService,
  ) {}

  public toggleNamedColor(item): void {
    if (this.buttonColors[item] === 'light') {
      this.buttonColors[item] = 'primary';
    } else {
      this.buttonColors[item] = 'light';
    }
  }

  ngOnInit() {
    this.setItem();
  }

  updateItem() {
    Object.keys(this.buttonColors).forEach(button => {
      if (this.buttonColors[button] === 'primary') {
        if (this.allAttributes.hasOwnProperty(button)) {
          this.selectedAttributes.push(button);
        }
        if (this.allOccasions.hasOwnProperty(button)) {
          this.selectedOccasions.push(button);
        }
      }
    });

    // create the updated item to be input in the DB
    this.updatedItem = {
      id_clothing_item: this.selectedItem.id_clothing_item,
      id_category: this.selectedCategoryID,
      price: this.price,
      id_image: this.selectedItem.id_image,
      count_worn: this.selectedItem.count_worn,
      id_occasion: this.selectedOccasionID,
      attribute: this.selectedAttributes.join(', '),
      color: this.selectedColors.join(', ')
    };
    this.apiService.updateClothingItem(this.updatedItem).subscribe((result) => {
      console.log(result);
      if (result === 'Accepted') {
        this.presentToast('Item updated!');
      } else {
        this.presentToast('Oops, something went wrong. Try again!');
      }
    });
  }

  print() {
    console.log(this);
  }
  setItem() {
    this.selectedItem = this.outfitSelectService.get('selectedItem');
    this.selectedItem.color.split(', ').forEach(color => {
      this.selectedColors.push(`${color[0].toUpperCase()}${color.slice(1)}`);
    });
    this.selectedItem.attribute.split(', ').forEach((attribute) => {
      if (Object.keys(this.buttonColors).indexOf(attribute) !== 1) {
        this.buttonColors[attribute] = 'primary';
      }
    });
    this.buttonColors[occasions[this.selectedItem.id_occasion]] = 'primary';
    this.selectedCategory.push(
      `${this.selectedItem.category[0].toUpperCase()}${this.selectedItem.category.slice(1)}`
    );
    this.initialprice = this.selectedItem.price;

  }

  attributeItem(input) {
    if (this.allAttributes[input] === true) {
      this.allAttributes[input] = false;
    } else {
      this.allAttributes[input] = true;
    }
  }

  occasionItem(input) {
    this.selectedOccasionID = input;
    // if (allOccasions[input] === true) {
    //   this.allOccasions[input] = false;
    // } else {
    //   this.allOccasions[input] = true;
    // }
  }

  selectCategory(input) {
    console.log(input);
    this.selectedCategory.splice(0, 2, `${category[input][0].toUpperCase()}${category[input].slice(1)}`);
    this.selectedCategoryID = input;
  }

  colorUserClicked(input) {
    console.log(input);
    if (this.selectedColors.length > 0) {
      this.selectedColors.splice(0, 2, input);
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      animated: true,
      duration: 3000
    });
    toast.present();
    // this.outfitSelected = true;
  }

}
