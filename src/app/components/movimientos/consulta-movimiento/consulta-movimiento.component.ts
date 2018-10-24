import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';
import {Cliente} from  '../../../shared/model/cliente';
import {Estado} from  '../../../shared/model/estado';


@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.component.html',
  providers: [MessageService]
})
export class ConsultaMovimientoComponent extends MovimientosComponent implements OnInit {

  cols: any[];
  cliente: Cliente;
  estado: Estado;
  fechaDesde: Date;
  fechaHasta: Date;

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
      { field: 'cliente.nombre', header: 'Cliente' },
      { field: 'estado.nombre.', header: 'Estado' },
      { field: 'fechaIngreso', header: 'Fecha Ingreso' },
      { field: 'fechaAlta', header: 'Fecha Alta'}
    ];

    this.fechaDesde = new Date;
    this.fechaHasta = new Date;

    this.traerClientes();
    this.traerEstados();

  }

  buscarMovimientos() {
      this.cliente = this.selectedCliente;

      let idCliente;
     if (!this.cliente) {
      idCliente = 'T';
    } else {
      idCliente = this.cliente._id;
    }
      this.estado = this.selectedEstado;

    let idEstado;
    if (!this.estado) {
      idEstado = 'T';
    } else {
      idEstado = this.estado._id;
    }

    this.fechaDesde.setHours(0,0,0,0);
    this.fechaHasta.setHours(0,0,0,0);

    const movimientoFiltro = new Object({
      clienteId : idCliente,
      estadoId : idEstado,
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta
    });

    this.authService.getMovimientos(movimientoFiltro).subscribe(data => {
      this.movimientos = data;
    });
  }
}
