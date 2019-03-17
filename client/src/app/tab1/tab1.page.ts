import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [AuthService],
})
export class Tab1Page implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getProfile((err, profile) => {
      console.log(profile);
    })
  }

}