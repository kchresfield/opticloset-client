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

  setItem() {
    // set the selected item on update-item to be the same as the item on the outfitSelectService
    this.selectedItem = this.outfitSelectService.get('selectedItem');

    // set the selectedColors to be the ones from the selected item by spliting the colors string
    this.selectedItem.color.split(', ').forEach(color => {
      this.selectedColors.push(`${color[0].toUpperCase()}${color.slice(1)}`); // then pushing into selectedColors
    });

    // set the attributes button colors to primary
    this.selectedItem.attribute.split(', ').forEach((attribute) => {
      // debugger;
      if (Object.keys(this.buttonColors).indexOf(attribute) !== -1) {
        this.buttonColors[attribute] = 'primary';
      }
    });
    // set the occasion button color to primary
    this.buttonColors[occasions[this.selectedItem.id_occasion]] = 'primary';

    // set the selectedOccasionID to be the one from the selectedItem
    this.selectedOccasionID = this.selectedItem.id_occasion;

    // set the selectedCategory to be the one from the selectedItem
    this.selectedCategory.push(
      `${this.selectedItem.category[0].toUpperCase()}${this.selectedItem.category.slice(1)}`
    );
    this.selectedCategoryID = this.selectedItem.id_category;

    // set the initial price based on the selectedItem
    this.initialprice = this.selectedItem.price;

  }

  updateItem() {
    // gather all the attributes and occasions with a color set as primary
    Object.keys(this.buttonColors).forEach(button => {
      if (this.buttonColors[button] === 'primary') { // for all buttons with color 'primary'
        if (this.allAttributes.hasOwnProperty(button)) { // check if the button is an attribute
          this.selectedAttributes.push(button); // if so => push the button into the selectedAttributes array
        }
        if (this.allOccasions.hasOwnProperty(button)) { // check if button is an occasion
          this.selectedOccasions.push(button); // if so => push the button into the selectedOccasions array
        }
      }
    });

    if (!this.price) {
      this.price = this.initialprice;
    }
    // create the updated item to be input in the DB
    this.updatedItem = {
      id_clothing_item: this.selectedItem.id_clothing_item,
      id_category: Number(this.selectedCategoryID),
      price: Number(this.price),
      id_image: this.selectedItem.id_image,
      count_worn: this.selectedItem.count_worn,
      id_occasion: Number(this.selectedOccasionID),
      attribute: this.selectedAttributes.join(', '),
      color: this.selectedColors.join(', '),
      category: this.selectedCategory[0],
    };
    this.apiService.updateClothingItem(this.updatedItem).subscribe((result) => {
      console.log(result);
      if (result === 'Accepted') {
        this.presentToast('Item updated!');
      } else {
        this.presentToast('Oops, something went wrong. Try again!');
      }
    });
    this.outfitSelectService.removeI('tab4Closet', this.selectedItem);
    this.outfitSelectService.removeI('closet', this.selectedItem);
    const temp = Object.assign(this.selectedItem, this.updatedItem);
    this.outfitSelectService.add('tab4Closet', temp);
    this.outfitSelectService.add('closet', temp);
  }

  print() {
    console.log(this);
  }

  attributeItem(input) {
    if (this.allAttributes[input] === true) {
      this.allAttributes[input] = false;
    } else {
      this.allAttributes[input] = true;
    }
  }

  // occasionItem(input) {
  //   debugger;
  //   this.selectedOccasionID = input;
  //   // if (allOccasions[input] === true) {
  //   //   this.allOccasions[input] = false;
  //   // } else {
  //   //   this.allOccasions[input] = true;
  //   // }
  // }

  occasionItem(input, occasion) {
    this.selectedOccasionID = input;
    if (this.buttonColors[occasion] === 'light') {
      for (let key in this.allOccasions) {
        this.buttonColors[key] = "light";
      }
      this.buttonColors[occasion] = 'primary';
    } else {
      this.buttonColors[occasion] = 'light';
    }
  }

  selectCategory(input) {
    this.selectedCategory.splice(0, 2, `${category[input][0].toUpperCase()}${category[input].slice(1)}`);
    this.selectedCategoryID = input;
  }

  colorUserClicked(input) {
    console.log(input);
    if (this.selectedColors.length > 0) {
      this.selectedColors.splice(0, 2, input);
    }
  }

  // present toast based on the server's response
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
