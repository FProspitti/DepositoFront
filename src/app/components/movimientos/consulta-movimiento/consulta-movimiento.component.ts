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
  Cliente: object;

  ngOnInit() {

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

    this.Cliente = ({

      nombre : {
        type: String,
        required: true
      },
      fechaAlta: {
        type: Date,
      },
      baja: {
        type: Boolean,
      },
      fechaBaja: {
        type: Date,
      }

    });

  }

  buscarMovimientos() {

    debugger;

    let clien = this.Cliente;
    clien = this.selectedCliente;


    const movimientoFiltro = new Object({
      cliente : clien,
      estado : this.selectedEstado,
      fechaDesde: 'adasdasd',
      fechaHasta: 'sdfsdf'
    });

    this.authService.getMovimientos1(movimientoFiltro).subscribe(data => {
      this.movimientos = data;
    });
  }
}
