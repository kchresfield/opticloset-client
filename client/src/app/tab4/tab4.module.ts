import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { HttpClient } from '@angular/common/http';

import { ItemOptionsModalModule } from '../modals/item-options-modal/item-options-modal.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ItemOptionsModalModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page],
  exports: [],
  entryComponents: [],
  bootstrap: [Tab4Page]
})
export class Tab4PageModule {}
