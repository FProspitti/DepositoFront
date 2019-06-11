import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Injectable()
export class MovimientosService extends AuthService {


  newMovimiento(movimiento) {
    return this.httpClient.post('http://localhost:3000/movimientos/nuevoMovimiento', movimiento);
  }

  updateMovimiento(movimiento) {
    return this.httpClient.put('http://localhost:3000/movimientos/updateMovimiento', movimiento);
  }

  deleteMovimiento(movimiento) {
    return this.httpClient.put('http://localhost:3000/movimientos/deleteMovimiento', movimiento);

  }

  getMovimiento(id) {
    return this.httpClient.get('http://localhost:3000/movimientos/getMovimiento/' + id);

  }

  getMovimientos(movimientoFiltro) {
    const httpParams: HttpParamsOptions = { fromObject: movimientoFiltro } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams)};
    return this.httpClient.get<any>('http://localhost:3000/movimientos/movimientos', options);
  }

}
