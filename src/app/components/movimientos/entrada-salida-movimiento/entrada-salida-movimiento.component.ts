import {Component, OnInit, ViewChild} from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';
// import {Dropdown} from "primeng/components/dropdown/dropdown";

@Component({
  selector: 'app-entrada-salida-movimiento',
  templateUrl: './entrada-salida-movimiento.component.html',
  providers: [MessageService]

})



export class EntradaSalidaMovimientoComponent extends MovimientosComponent implements OnInit {
  id: Number;
  cliente: Object;
  // @ViewChild("dc") dc;
  // @ViewChild("de") de;

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
  }

  buscarMovimiento() {
    this.selectedEstado = new Object;
    this.selectedCliente = new Object;

  if (this.id) {
      this.authService.getMovimiento(this.id).subscribe(data => {
        if (data) {
          // this.messageService.add({severity: 'success', summary: 'Movimiento', detail: 'Encontrado'});
          this.fechaIngreso = new Date(data.fechaIngreso);
          if (data.cliente) {
            this.authService.getCliente(data.cliente).subscribe(cliente => {
              this.selectedCliente = cliente;
            });
          }

          if (data.estado) {
            this.authService.getEstado(data.estado).subscribe(estado => {
              this.selectedEstado = estado;
            });
          }

        } else {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'No encontrado'});
        }
      });
    }
  }

  save() {
    var movimient = new Object();
    movimient = {
      cliente : this.selectedCliente,
      estado : this.selectedEstado,
      fechaIngreso : this.fechaIngreso
    };

    this.authService.newMovimiento(movimient).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity:'success', summary:'Ingreso', detail:'Creado correctamente'});
        this.limpiarCampos();
        this.id = null;
      } else {
        this.messageService.add({severity:'error', summary:'Ingreso', detail:'Error al ingresar'});
      }
    });
  }

}
