import { Component, OnInit } from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-entrada-salida-movimiento',
  templateUrl: './entrada-salida-movimiento.component.html',
  providers: [MessageService]

})
export class EntradaSalidaMovimientoComponent extends MovimientosComponent implements OnInit {


  id: Number;

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
  }

  buscarMovimiento() {
    this.authService.getMovimiento(this.id).subscribe(data => {
      console.log(data);
      // if (data.success) {
      //   this.messageService.add({severity:'success', summary:'Estado', detail:'Eliminado correctamente'});
      // } else {
      //   this.messageService.add({severity:'error', summary:'Estado', detail:'Error al eliminar'});
      // }
      // this.estado = null;
      // this.displayDialogDelete = false;
      // this.cargarTabla();

    });
  }

}
