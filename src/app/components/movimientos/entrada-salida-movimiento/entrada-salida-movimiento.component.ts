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
          this.movimiento = data;
          if (data.cliente) {
            this.authService.getCliente(data.cliente).subscribe(cliente => {
              this.selectedCliente = cliente;
              this.movimiento.cliente = cliente;
            });
          }

          if (data.estado) {
            this.authService.getEstado(data.estado).subscribe(estado => {
              if (this.movimiento.baja) {
                this.selectedEstadoActual = 'Baja';
              } else {
                this.selectedEstadoActual = estado.nombre;
              }
              this.movimiento.estado = estado;
            });
          }
        } else {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'No encontrado'});
        }
      });
    }
  }

  save() {
    this.fecha.setHours(0, 0, 0, 0);

    var movimient = new Object();
    movimient = {
      _id: this.movimiento._id,
      cliente: this.selectedCliente,
      estado: this.selectedEstado,
      fecha: this.fecha
    };

    this.authService.updateMovimiento(movimient).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity: 'success', summary: 'Ingreso', detail: 'Creado correctamente'});
        this.limpiarCampos();
        this.id = null;
      } else {
        this.messageService.add({severity: 'error', summary: 'Ingreso', detail: 'Error al ingresar'});
      }
    });
  }

  borrar() {
    this.authService.deleteMovimiento(this.movimiento).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity: 'success', summary: 'Movimiento', detail: 'Borrado correctamente'});
        this.limpiarCampos();
        this.id = null;
      } else {
        this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Error al borrar'});
      }
    });
  }

  reimprirMovimiento() {
    this.displayDialog = true;
  }

  getStyleBaja() {
    if (this.movimiento) {
      if (this.movimiento.baja) {
        return 'red';
      } else {
        return 'blue';
      }
    }
  }
}

