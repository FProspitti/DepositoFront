import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Injectable()
export class CaracteristicasService extends AuthService{

  deleteCaracteristica(caracteristica) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/caracteristicas/deleteCaracteristica', caracteristica , {headers: headers})
      .map(res => res.json());

  }

  updateCaracteristica(caracteristica) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/caracteristicas/updateCaracteristica', caracteristica , {headers: headers})
      .map(res => res.json());

  }

  newCaracteristica(caracteristica) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/caracteristicas/nuevaCaracteristica', caracteristica, {headers: headers})
      .map(res => res.json());
  }

  getCaracteristicas() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/caracteristicas/caracteristicas', {headers: headers})
      .map(res => res.json());
  }

  getCaracteristicasFiltro(caracteristicaFiltro) {
    this.loadToken();
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json').set( 'Authorization', this.authToken);
    const httpParams: HttpParamsOptions = { fromObject: caracteristicaFiltro } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.httpClient.get<any>('http://localhost:3000/caracteristicas/caracteristicasFiltro', options)
      .map(res => res);
  }

  getCaracteristicasTipo(tipo) {
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get('http://localhost:3000/caracteristicas/caracteristicasTipo/'+tipo , {headers: headers})
      .map(res => res.json());

  }
}
