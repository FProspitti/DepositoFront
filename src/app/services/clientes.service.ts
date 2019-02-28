import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class ClientesService extends  AuthService {

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

  getCliente(id) {
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/clientes/getCliente/'+id , {headers: headers})
      .map(res => res.json());

  }

}
