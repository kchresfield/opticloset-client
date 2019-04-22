import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          },
          {
            path: '/attributes', 
            loadChildren: '../attributes/tab2.attrubite.module#Tab2AttributePageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          },
          {
            path: '/posted-list',
            loadChildren:
              '../tab3/posted-list/posted-list.module#PostedListPageModule'
          },
          {
            path: '/sell-on-ebay',
            loadChildren:
              '../tab3/tab3sell/tab3sell.module#Tab3SellModule'
          },
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          },
          {
            path: '/update-item',
            loadChildren:
              '../tab4/update-item/update-item.module#UpdateItemPageModule'
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/tabs/tab1'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/tab1'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
