import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-entrada-salida-movimiento',
  templateUrl: './entrada-salida-movimiento.component.html',
  providers: [MessageService]

})
export class EntradaSalidaMovimientoComponent extends MovimientosComponent implements OnInit {

  ngOnInit() {

  }

}
