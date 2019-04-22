import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Attribute } from './tab2.attribute';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: 'attributes', component: Tab2Attribute }])
  ],
  declarations: [Tab2Attribute]
})
export class Tab2AttributePageModule { }