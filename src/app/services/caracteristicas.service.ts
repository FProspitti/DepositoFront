import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';


@Injectable()
export class CaracteristicasService extends AuthService {

  deleteCaracteristica(caracteristica) {
    return this.httpClient.put('http://localhost:3000/caracteristicas/deleteCaracteristica', caracteristica);

  }

  updateCaracteristica(caracteristica) {
    return this.httpClient.put('http://localhost:3000/caracteristicas/updateCaracteristica', caracteristica);

  }

  newCaracteristica(caracteristica) {
    return this.httpClient.post('http://localhost:3000/caracteristicas/nuevaCaracteristica', caracteristica);
  }

  getCaracteristicas() {
    return this.httpClient.get('http://localhost:3000/caracteristicas/caracteristicas');
  }

  getCaracteristicasFiltro(caracteristicaFiltro) {
    const httpParams: HttpParamsOptions = { fromObject: caracteristicaFiltro } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams)};
    return this.httpClient.get<any>('http://localhost:3000/caracteristicas/caracteristicasFiltro', options);
  }

  getCaracteristicasTipo(tipo) {
    return this.httpClient.get('http://localhost:3000/caracteristicas/caracteristicasTipo/'+tipo);

  }
}
