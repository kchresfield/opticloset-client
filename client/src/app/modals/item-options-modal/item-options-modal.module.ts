import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ItemOptionsModal } from './item-options-modal.component';

@NgModule({
  declarations: [ItemOptionsModal],
  imports: [
    IonicModule,
    CommonModule
  ],
  entryComponents: [
    ItemOptionsModal
  ]
})
export class ItemOptionsModalModule {}
