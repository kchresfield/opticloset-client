import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth.config';

(window as any).global = window;

@Injectable()
export class AuthService {
  isLoggedIn$ = new Subject();
  isLoggedIn: Boolean = false;
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: `http://${AUTH_CONFIG.host}:8100/home`,
    scope: 'openid profile'
  });

  userProfile: any;

  constructor(public router: Router, public http: HttpClient) {
    // Check if user is logged In when Initializing
    const loggedIn = this.isLoggedIn = this.isAuthenticated();
    this.isLoggedIn$.next(loggedIn);
  }


  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    debugger;
    this.auth0.parseHash({ 
      hash: window.location.hash,
    }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        const loggedIn = this.isLoggedIn = true;
        this.isLoggedIn$.next(loggedIn);
        this.router.navigate(['/']);
        // this.http.get('https://opticloset.auth0.com/userinfo', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.access_token}`,
        //   },
        // }).subscribe((userInfo) => {
        //   console.log(userInfo);
        // })
      } else if (err) {
        const loggedIn = this.isLoggedIn = false;
        this.isLoggedIn$.next(loggedIn);
        this.router.navigate(['/']);
      }
    });
  }

  private setSession(authResult): void {
    debugger;
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    console.log('logging out')
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    const loggedIn = this.isLoggedIn = false;
    this.isLoggedIn$.next(loggedIn);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    // debugger;
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {

    if (!localStorage.getItem('access_token')) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(localStorage.getItem('access_token'), (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
