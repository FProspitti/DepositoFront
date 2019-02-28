import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Injectable()
export class MovimientosService extends AuthService{


  newMovimiento(movimiento) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/movimientos/nuevoMovimiento', movimiento, {headers: headers})
      .map(res => res.json());
  }

  updateMovimiento(movimiento) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/movimientos/updateMovimiento', movimiento , {headers: headers})
      .map(res => res.json());

  }

  deleteMovimiento(movimiento) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/movimientos/deleteMovimiento', movimiento , {headers: headers})
      .map(res => res.json());

  }

  getMovimiento(id) {
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/movimientos/getMovimiento/'+id , {headers: headers})
      .map(res => res.json());

  }

  getMovimientos(movimientoFiltro) {
    this.loadToken();
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json').set( 'Authorization', this.authToken);
    const httpParams: HttpParamsOptions = { fromObject: movimientoFiltro } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.httpClient.get<any>('http://localhost:3000/movimientos/movimientos', options)
      .map(res => res);
  }

}
