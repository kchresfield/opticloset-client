import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { PostedListPageModule } from './posted-list/posted-list.module';
import { Tab3SellModule } from './tab3sell/tab3sell.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PostedListPageModule,
    Tab3SellModule,
    RouterModule.forChild([
      { path: '', component: Tab3Page },
      { path: 'posted-list', component: PostedListPageModule },
      { path: 'sell-on-ebay', component: Tab3SellModule }
    ])
  ],
  declarations: [Tab3Page],
  entryComponents: [Tab3Page],
  bootstrap: [Tab3Page],
})
export class Tab3PageModule {}
