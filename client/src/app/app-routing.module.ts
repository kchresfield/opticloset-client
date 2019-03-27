import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PackingListComponentModule } from './packing-list/packing-list.component.module';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule', pathMatch: 'full', },
  { path: 'callback', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule', },
  { path: 'attribute', loadChildren: './attributes/tab2.attrubite.module#Tab2AttributePageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'sell-on-ebay', loadChildren: './tab3/tab3sell/tab3sell.module#Tab3SellModule' },
  { path: 'packing-list', loadChildren: './packing-list/packing-list.component.module#PackingListComponentModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
