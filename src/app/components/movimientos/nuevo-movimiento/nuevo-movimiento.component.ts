import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  providers: [MessageService]
})
export class NuevoMovimientoComponent extends MovimientosComponent implements OnInit {

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    };

    console.log('init');
    for (let i = 1; i <= 7; i++) {
      this.buscarCaracteristicasXtipos(i);
    }
    this.traerClientes();
    this.traerEstados();
    this.fecha = new Date;
    this.fechaRegistro = new Date;

    this.movimientoForm = this.fb.group({
      'clienteValido': new FormControl('', Validators.required),
    });
  }

  showConfirmar() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Desea crear un nuevo movimiento?', detail:'Confirme para continuar'});
  }

  hideConfirmar() {
    this.messageService.clear('c');
  }


}
