import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpParamsOptions} from '../../../node_modules/@angular/common/http/src/params';
import {Http} from '@angular/http';




@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(public httpClient: HttpClient,
              public http: Http) {
 }

  registerUser(user) {
    return this.httpClient.post('http://localhost:3000/users/register', user);
  }

  authenticateUser(user) {
    return this.http.post('http://localhost:3000/users/authenticate', user);
  }

  getProfile() {
    return this.httpClient.get('http://localhost:3000/users/profile');
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
   return this.httpClient.get('http://localhost:3000/users/users');
  }

  deleteUser(user) {
    return this.httpClient.put('http://localhost:3000/users/deleteUser', user);
  }

  updateUser(user) {
    return this.httpClient.put('http://localhost:3000/users/updateUser', user);
 }

  updateUserPass(user) {
    return this.httpClient.put('http://localhost:3000/users/updateUserPass', user);

  }

}
