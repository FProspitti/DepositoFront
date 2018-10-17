import {Component, OnInit, ViewChild} from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';
import {Cliente} from '../../../shared/model/cliente';

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

    this.traerEstados();
  }

  buscarMovimiento() {
    this.selectedEstado = new Object;
    if (this.id) {
      this.authService.getMovimiento(this.id).subscribe(data => {
        if (data) {
          this.movimiento = data;
          if (this.movimiento.cliente) {
            debugger;
            this.clienteNombre = this.movimiento.cliente.nombre;
          }
          if (data.estado) {
              if (this.movimiento.baja) {
                this.selectedEstadoActual = 'Baja';
              } else {
                this.selectedEstadoActual = data.estado.nombre;
              }
          }
          this.caracNombre1 = this.movimiento.caracteristicas1.nombre;
          this.caracNombre2 = this.movimiento.caracteristicas2.nombre;
          this.caracNombre3 = this.movimiento.caracteristicas3.nombre;
          this.caracNombre4 = this.movimiento.caracteristicas4.nombre;
          this.caracNombre5 = this.movimiento.caracteristicas5.nombre;
          this.caracNombre6 = this.movimiento.caracteristicas6.nombre;
          this.caracNombre7 = this.movimiento.caracteristicas7.nombre;
          this.caracNombre8 = this.movimiento.caracteristicas8;
          this.caracNombre9 = this.movimiento.caracteristicas9;
          this.caracNombre10 = this.movimiento.caracteristicas10;
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
      cliente: this.movimiento.cliente,
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

