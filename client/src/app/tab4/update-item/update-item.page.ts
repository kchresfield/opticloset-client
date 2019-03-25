import { Component, OnInit } from '@angular/core';



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
const topTwoColors = [];
const arrOfSelectedColors = { color: "userInputColor" };

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  

  constructor() { }

  ngOnInit() {
  }

}
