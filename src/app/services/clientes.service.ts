import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class ClientesService extends  AuthService {

  deleteCliente(cliente) {
    return this.httpClient.put('http://localhost:3000/clientes/deleteCliente', cliente);

  }

  updateCliente(cliente) {
    return this.httpClient.put('http://localhost:3000/clientes/updateCliente', cliente);

  }

  newCliente(cliente) {
    return this.httpClient.post('http://localhost:3000/clientes/nuevoCliente', cliente);
  }

  getClientes() {
    return this.httpClient.get<any>('http://localhost:3000/clientes/clientes');
  }

  getCliente(id) {
    return this.httpClient.get('http://localhost:3000/clientes/getCliente/'+id);

  }

}
