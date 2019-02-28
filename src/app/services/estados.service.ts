import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class EstadosService extends  AuthService {

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

  getEstado(id) {
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/estados/getEstado/'+id , {headers: headers})
      .map(res => res.json());

  }

  getEstadoNombre(nombre) {
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/estados/getEstadoNombre/'+nombre , {headers: headers})
      .map(res => res.json());

  }

}
