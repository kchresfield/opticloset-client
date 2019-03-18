import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ItemOptionsModal } from './item-options-modal.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tab1',
    children: [
      {
        path: '',
        // loadChildren: '../tab1/tab1.module#Tab1PageModule'
      }
    ]
  }
];


@NgModule({
  declarations: [ItemOptionsModal],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    ItemOptionsModal
  ]
})
export class ItemOptionsModalModule {}
