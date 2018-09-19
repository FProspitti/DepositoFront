import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.component.html',
  providers: [MessageService]
})
export class ConsultaMovimientoComponent extends MovimientosComponent implements OnInit {

  cols: any[];

  ngOnInit() {

    // this.cargarTabla();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };


    this.cols = [
      { field: 'idMov', header: 'Id' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'estado', header: 'Estado' },
      { field: 'fechaIngreso', header: 'Fecha Ingreso' },
      { field: 'fechaAlta', header: 'Fecha Alta'}
    ];

  }

  buscarMovimientos() {

    const movimientoFiltro = new Object({
      cliente: 'asd',
      estado: 'asdasd',
      fechaDesde: 'adasdasd',
      fechaHasta: 'sdfsdf'
    });

    this.authService.getMovimientos(movimientoFiltro).subscribe(movimientos => {
      this.movimientos = movimientos;

    }, err => {
      console.log(err);
      return false;
    });
  }


}