import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-item-options-modal',
  templateUrl: './item-options-modal.component.html',
  styleUrls: ['./item-options-modal.component.scss'],
})
export class ItemOptionsModal {
  // "value" passed in componentProps
  // @Input() value: number;
  myParameter: boolean;
  myOtherParameter: Date;
  constructor(private modalController: ModalController,
    private navParams: NavParams) {  // componentProps can also be accessed at construction time using NavParams
  }
}


