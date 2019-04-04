import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostedListPage } from './posted-list.page';

// const routes: Routes = [
//   {
//     path: 'posted-list',
//     component: PostedListPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: 'posted-list', component: PostedListPage }])
  ],
  declarations: [PostedListPage]
})
export class PostedListPageModule {}
