import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Sell } from './tab3sell';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: 'sell-on-ebay', component: Tab3Sell }])
  ],
  declarations: [Tab3Sell]
})
export class Tab3SellModule {}
