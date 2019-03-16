import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
  }

}
