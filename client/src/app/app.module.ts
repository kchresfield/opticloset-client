import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'; // DND
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera/ngx';

import { ApiService } from './services/api/api.service';
import { Router } from '@angular/router';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OutfitSelectService } from './services/outfit-select.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { Tab4Page } from './tab4/tab4.page';

// import { NavParams } from '@ionic/angular';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    ApiService,
    AuthService,
    UserService,
    OutfitSelectService,
    Geolocation,
    LocalNotifications,
    Tab4Page,
    // NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
