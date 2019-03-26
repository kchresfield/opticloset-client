import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateItemPage } from './update-item.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: 'update-item', component: UpdateItemPage }])
  ],
  declarations: [UpdateItemPage]
})
export class UpdateItemPageModule {}
