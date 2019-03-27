import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  // providers: [ApiService],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    public authService: AuthService,
  ) {
    this.initializeApp();
    this.authService.handleAuthentication();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.apiService.getConditions().subscribe((res) => {
      //   console.log(res);
      // });
    });
  }
}
