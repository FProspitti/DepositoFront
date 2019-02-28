import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpParamsOptions} from '../../../node_modules/@angular/common/http/src/params';




@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(public http: Http,
              public httpClient: HttpClient) {
 }

  registerUser(user) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUsers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/users', {headers: headers})
      .map(res => res.json());
  }

  deleteUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/users/deleteUser', user , {headers: headers})
      .map(res => res.json());

  }

  updateUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/users/updateUser', user , {headers: headers})
      .map(res => res.json());

  }

  updateUserPass(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/users/updateUserPass', user , {headers: headers})
      .map(res => res.json());

  }

}
