import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule', pathMatch: 'full', },
  { path: 'callback', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule', },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
