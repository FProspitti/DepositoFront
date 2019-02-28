import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MovimientosComponent} from '../movimientos.component';
import {MessageService} from 'primeng/api';
import {Cliente} from '../../../shared/model/cliente';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-entrada-salida-movimiento',
  templateUrl: './entrada-salida-movimiento.component.html',
  providers: [MessageService]

})

export class EntradaSalidaMovimientoComponent extends MovimientosComponent implements OnInit {
@ViewChild('codigoBarra') codigoBarraInput: ElementRef;

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
    this.fecha = new Date();

    this.entradaSalidaMovimientoForm = this.fb.group({
      'codigoBarra': new FormControl('', Validators.required),
      'estado': new FormControl('', Validators.required),
      'fechaIngreso': new FormControl('', Validators.required),
    });

    this.codigoBarraInput.nativeElement.focus();
  }

  buscarMovimiento() {
    this.limpiarCampos();
    this.movimiento = null;
    if (this.id) {
      this.movimientosService.getMovimiento(this.id).subscribe(data => {
        if (data) {
          this.movimiento = data;
          if (this.movimiento.cliente) {
            this.clienteNombre = this.movimiento.cliente.nombre;
          }
          if (data.estado) {
              if (this.movimiento.baja) {
                this.selectedEstadoActual = 'Baja';
              } else {
                this.selectedEstadoActual = data.estado.nombre;
              }
          }
          if (this.movimiento.caracteristicas1 != null) {
            this.caracNombre1 = this.movimiento.caracteristicas1.nombre;
          }
          if (this.movimiento.caracteristicas2 != null) {
            this.caracNombre2 = this.movimiento.caracteristicas2.nombre;
          }
          if (this.movimiento.caracteristicas3 != null) {
            this.caracNombre3 = this.movimiento.caracteristicas3.nombre;
          }
          if (this.movimiento.caracteristicas4 != null) {
            this.caracNombre4 = this.movimiento.caracteristicas4.nombre;
          }
          if (this.movimiento.caracteristicas5 != null) {
            this.caracNombre5 = this.movimiento.caracteristicas5.nombre;
          }
          if (this.movimiento.caracteristicas6 != null) {
            this.caracNombre6 = this.movimiento.caracteristicas6.nombre;
          }
          if (this.movimiento.caracteristicas7 != null) {
            this.caracNombre7 = this.movimiento.caracteristicas7.nombre;
          }
          if (this.movimiento.caracteristicas8 != null) {
            this.caracNombre8 = this.movimiento.caracteristicas8;
          }
          if (this.movimiento.caracteristicas9 != null) {
            this.caracNombre9 = this.movimiento.caracteristicas9;
          }
          if (this.movimiento.caracteristicas10 != null) {
            this.caracNombre10 = this.movimiento.caracteristicas10;
          }
        } else {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'No encontrado'});
        }
      });
    }
  }

  save() {
    if (!this.entradaSalidaMovimientoForm.valid) {
      if (!this.entradaSalidaMovimientoForm.controls['codigoBarra'].valid) {
        this.entradaSalidaMovimientoForm.controls['codigoBarra'].markAsDirty();
      }
      if (!this.entradaSalidaMovimientoForm.controls['estado'].valid) {
        this.entradaSalidaMovimientoForm.controls['estado'].markAsDirty();
      }
      if (!this.entradaSalidaMovimientoForm.controls['fechaIngreso'].valid) {
        this.entradaSalidaMovimientoForm.controls['fechaIngreso'].markAsDirty();
      }
      return;
    }
    if (this.movimiento != null) {
      this.fecha.setHours(0, 0, 0, 0);
      let fechaVali;
      var movimient = new Object();
      movimient = {
        _id: this.movimiento._id,
        cliente: this.movimiento.cliente,
        estado: this.selectedEstado,
        fecha: this.fecha
      };

      if (this.movimiento.baja) {
        this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'El movimiento ya se encuentra dado de baja'});
        return;
      }

      if (this.movimiento.estado.nombre === 'Registro') {
            fechaVali = new Date(this.movimiento.fechaRegistro);
          if (fechaVali.getTime() > this.fecha.getTime()) {
            this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'La fecha de ingreso debe ser mayor a la de registro'});
            return;
          }
          if (this.selectedEstado.nombre !== 'Ingreso') {
            this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Debe ingresar primero el movimiento'});
            return;
          }
      }

      if (this.movimiento.estado.nombre === 'Ingreso') {
        fechaVali = new Date(this.movimiento.fechaIngreso);
        if (fechaVali.getTime() > this.fecha.getTime()) {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'La fecha de salida debe ser mayor a la de ingreso'});
          return;
        }
        if (this.selectedEstado.nombre !== 'Salida') {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'El movimiento ya se encuentra ingresado'});
          return;
        }
      }

      if (this.movimiento.estado.nombre === 'Salida') {
        this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'El movimiento ya se encuentra en estado de salida'});
        return;
      }

      this.movimientosService.updateMovimiento(movimient).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Ingreso', detail: 'Creado correctamente'});
          this.id = null;
          this.entradaSalidaMovimientoForm.reset();
          this.limpiarCampos();
          this.movimiento = null;
        } else {
          this.messageService.add({severity: 'error', summary: 'Ingreso', detail: 'Error al ingresar'});
        }
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Debe buscar un movimiento'});
    }
  }

  borrar() {
    this.messageService.clear('baja');
    if (this.movimiento != null) {
      if (this.movimiento.estado.nombre !== 'Registro') {
        this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'El movimiento solo se puede dar de baja en estado Registrado'});
        return;
      }

      this.movimientosService.deleteMovimiento(this.movimiento).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Movimiento', detail: 'Borrado correctamente'});
          this.id = null;
          this.entradaSalidaMovimientoForm.reset();
          this.limpiarCampos();
          this.movimiento = null;
        } else {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Error al borrar'});
        }
      });
    }  else {
          this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Debe buscar un movimiento'});
    }

}
  reimprirMovimiento() {
    if (this.movimiento != null) {
      this.displayDialog = true;
    } else {
      this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Debe buscar un movimiento'});
    }
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
  showConfirmarBaja() {
    if (this.movimiento != null) {
      if (!this.entradaSalidaMovimientoForm.controls['codigoBarra'].valid) {
        this.entradaSalidaMovimientoForm.controls['codigoBarra'].markAsDirty();
      }
      this.messageService.clear();
      this.messageService.add({
        key: 'baja',
        sticky: true,
        severity: 'warn',
        summary: 'Desea dar de baja el movimiento?',
        detail: 'Confirme para continuar'
      });
    }else {
      this.messageService.add({severity: 'error', summary: 'Movimiento', detail: 'Debe buscar un movimiento'});
    }
  }
  hideConfirmarBaja() {
    this.messageService.clear('baja');
  }
}

