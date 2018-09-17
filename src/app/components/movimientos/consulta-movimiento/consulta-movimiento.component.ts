import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.component.html',
  providers: [MessageService]
})
export class ConsultaMovimientoComponent extends MovimientosComponent implements OnInit {

  ngOnInit() {
  }

}
