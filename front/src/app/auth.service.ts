import { Injectable } from '@angular/core';

import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  setJWT(jwt) {
    localStorage.setItem('JWT_token',jwt);
  }

  getJWT(jwt) {
    localStorage.getItem('JWT_token');
  }

}