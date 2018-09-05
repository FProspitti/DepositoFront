import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
  }


  registerUser(user) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
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
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/users', {headers: headers})
      .map(res => res.json());
  }

  deleteUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/users/deleteUser', user , {headers: headers})
      .map(res => res.json());

  }

  updateUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/users/updateUser', user , {headers: headers})
      .map(res => res.json());

  }

  deleteUnidad(unidad) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/unidades/deleteUnidad', unidad , {headers: headers})
      .map(res => res.json());

  }

  updateUnidad(unidad) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/unidades/updateUnidad', unidad , {headers: headers})
      .map(res => res.json());

  }

  newUnidad(unidad) {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/unidades/nuevaUnidad', unidad, {headers: headers})
      .map(res => res.json());
  }

  getUnidades() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/unidades/unidades', {headers: headers})
      .map(res => res.json());
  }

  deleteCliente(cliente) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/clientes/deleteCliente', cliente , {headers: headers})
      .map(res => res.json());

  }

  updateCliente(cliente) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/clientes/updateCliente', cliente , {headers: headers})
      .map(res => res.json());

  }

  newCliente(cliente) {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/clientes/nuevoCliente', cliente, {headers: headers})
      .map(res => res.json());
  }

  getClientes() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/clientes/clientes', {headers: headers})
      .map(res => res.json());
  }


}
