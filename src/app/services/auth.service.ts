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

  deleteUnidad(unidad) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/unidades/deleteUnidad', unidad , {headers: headers})
      .map(res => res.json());

  }

  updateUnidad(unidad) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/unidades/updateUnidad', unidad , {headers: headers})
      .map(res => res.json());

  }

  newUnidad(unidad) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/unidades/nuevaUnidad', unidad, {headers: headers})
      .map(res => res.json());
  }

  getUnidades() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/unidades/unidades', {headers: headers})
      .map(res => res.json());
  }

  deleteCliente(cliente) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/clientes/deleteCliente', cliente , {headers: headers})
      .map(res => res.json());

  }

  updateCliente(cliente) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/clientes/updateCliente', cliente , {headers: headers})
      .map(res => res.json());

  }

  newCliente(cliente) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/clientes/nuevoCliente', cliente, {headers: headers})
      .map(res => res.json());
  }

  getClientes() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/clientes/clientes', {headers: headers})
      .map(res => res.json());
  }


  deleteEstado(estado) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/estados/deleteEstado', estado , {headers: headers})
      .map(res => res.json());

  }

  updateEstado(estado) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/estados/updateEstado', estado , {headers: headers})
      .map(res => res.json());

  }

  newEstado(estado) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/estados/nuevoEstado', estado, {headers: headers})
      .map(res => res.json());
  }

  getEstados() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/estados/estados', {headers: headers})
      .map(res => res.json());
  }

  newMovimiento(movimiento) {
    // const movimiento1 = movimiento;
    // this.movimiento1{
    //   cliente: cliente
    // };
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/movimientos/nuevoMovimiento', movimiento, {headers: headers})
      .map(res => res.json());
  }


}
