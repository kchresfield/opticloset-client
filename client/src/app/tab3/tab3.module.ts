import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
// import {Tab3Sell } from './tab3sell/tab3sell';
import { PostedListPageModule } from './posted-list/posted-list.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PostedListPageModule,
    RouterModule.forChild([
      { path: '', component: Tab3Page },
      { path: 'posted-list', component: PostedListPageModule }
      // { path: 'tab3sell', component: Tab3Sell }
    ])
  ],
  declarations: [Tab3Page],
  entryComponents: [Tab3Page],
  bootstrap: [Tab3Page],
})
export class Tab3PageModule {}
