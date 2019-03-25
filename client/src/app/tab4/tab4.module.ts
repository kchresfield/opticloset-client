import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { HttpClient } from '@angular/common/http';
import { UpdateItemPage } from './update-item/update-item.page';
import { ItemOptionsModalModule } from '../modals/item-options-modal/item-options-modal.module';
import { UpdateItemPageModule } from './update-item/update-item.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ItemOptionsModalModule,
    UpdateItemPageModule,
    RouterModule.forChild([
      { path: '', component: Tab4Page },
      { path: '/update-item', component: UpdateItemPage }
    ])
  ],
  declarations: [Tab4Page],
  exports: [],
  entryComponents: [Tab4Page],
  bootstrap: [Tab4Page]
})
export class Tab4PageModule {}
