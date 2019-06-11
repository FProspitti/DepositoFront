import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class EstadosService extends  AuthService {

  deleteEstado(estado) {
    return this.httpClient.put('http://localhost:3000/estados/deleteEstado', estado);

  }

  updateEstado(estado) {
    return this.httpClient.put('http://localhost:3000/estados/updateEstado', estado);

  }

  newEstado(estado) {
    return this.httpClient.post('http://localhost:3000/estados/nuevoEstado', estado);
  }

  getEstados() {
    return this.httpClient.get<any>('http://localhost:3000/estados/estados');
  }

  getEstado(id) {
    return this.httpClient.get('http://localhost:3000/estados/getEstado/' + id);

  }

  getEstadoNombre(nombre) {
    return this.httpClient.get('http://localhost:3000/estados/getEstadoNombre/' + nombre);
}

}
