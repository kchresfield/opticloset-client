import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile: Object;

  constructor(
    public httpClient: HttpClient,
  ) { }

  public getUser(): Promise<Object> {
    return this.httpClient.get('https://opticloset.auth0.com/userinfo', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
    }).toPromise().then((userInfo) => {
      this.profile = userInfo;
      return this.profile;
    });
  }
}
