import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../node_modules/primeng/api';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MenuItem} from '../../../../node_modules/primeng/primeng';
import {SelectItem} from 'primeng/api';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Movimiento} from  '../../shared/model/movimiento';
import {Estado} from  '../../shared/model/estado';
import {Caracteristica} from '../../shared/model/caracteristica';
import { Dropdown } from 'primeng/components/dropdown/dropdown';
import {Cliente} from '../../shared/model/cliente';
import {ClientesService} from '../../services/clientes.service';
import {MovimientosService} from '../../services/movimientos.service';
import {EstadosService} from '../../services/estados.service';
import {CaracteristicasService} from '../../services/caracteristicas.service';



@Component({
  selector: 'app-movimiento',
  templateUrl: './nuevo-movimiento/nuevo-movimiento.component.html',
  providers: [MessageService]
})

export class MovimientosComponent implements OnInit {

  movimientos: Movimiento[];
  clientes: Cliente[];
  estados: SelectItem[];
  estado: any;
  selectedCliente: Cliente;
  selectedEstado: any;
  selectedCaracteristica1: any;
  selectedCaracteristica2: any;
  selectedCaracteristica3: any;
  selectedCaracteristica4: any;
  selectedCaracteristica5: any;
  selectedCaracteristica6: any;
  selectedCaracteristica7: any;
  caracteristica8: string;
  caracteristica9: string;
  caracteristica10: string;
  selectedEstadoActual: String;
  clienteNombre: String;
  movimiento: Movimiento;
  newMovimiento: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  fecha: Date;
  fechaRegistro: Date;
  es: any;
  movform: FormGroup;
  pos: any;
  caracteristicas1: Caracteristica[];
  caracteristicas2: Caracteristica[];
  caracteristicas3: Caracteristica[];
  caracteristicas4: Caracteristica[];
  caracteristicas5: Caracteristica[];
  caracteristicas6: Caracteristica[];
  caracteristicas7: Caracteristica[];
  caractetistica: Caracteristica[];
  caracNombre1: String;
  caracNombre2: String;
  caracNombre3: String;
  caracNombre4: String;
  caracNombre5: String;
  caracNombre6: String;
  caracNombre7: String;
  caracNombre8: String;
  caracNombre9: String;
  caracNombre10: String;
  nuevoMovimientoForm: FormGroup;
  entradaSalidaMovimientoForm: FormGroup;
  consultaMovimientoForm: FormGroup;

  // d1: Dropdown;


  constructor(public authService: AuthService,
              public movimientosService: MovimientosService,
              public estadosService: EstadosService,
              public caracteristicasService: CaracteristicasService,
              public router: Router,
              public flashMessages: FlashMessagesService,
              public messageService: MessageService,
              public fb: FormBuilder,
              public clientesService: ClientesService) {
  }

  ngOnInit() {

  }

  save() {
    this.messageService.clear('c');
    this.fechaRegistro.setHours(0, 0, 0, 0);

    this.estadosService.getEstadoNombre('Registro').subscribe(estado => {
      this.estado = estado;

      var movimient = new Object();
      movimient = {
        cliente: this.selectedCliente,
        estado: this.estado,
        fechaRegistro: this.fechaRegistro,
        caracteristicas1: this.selectedCaracteristica1,
        caracteristicas2: this.selectedCaracteristica2,
        caracteristicas3: this.selectedCaracteristica3,
        caracteristicas4: this.selectedCaracteristica4,
        caracteristicas5: this.selectedCaracteristica5,
        caracteristicas6: this.selectedCaracteristica6,
        caracteristicas7: this.selectedCaracteristica7,
        caracteristicas8: this.caracteristica8,
        caracteristicas9: this.caracteristica9,
        caracteristicas10: this.caracteristica10
      };

      this.movimientosService.newMovimiento(movimient).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Ingreso', detail: 'Creado correctamente'});
          this.movimiento = data.mov;
          this.limpiarCamposNuevo();
          this.displayDialog = true;
        } else {
          this.messageService.add({severity: 'error', summary: 'Ingreso', detail: 'Error al ingresar'});
        }
      });
    });
  }
  traerClientes() {
    this.clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;

    }, err => {
      console.log(err);
      return false;
    });
  }

  traerEstados() {
    this.estadosService.getEstados().subscribe(estados => {
      this.estados = estados;
    }, err => {
      console.log(err);
      return false;
    });
  }

  limpiarCampos() {
    this.fecha = new Date;
    this.entradaSalidaMovimientoForm.controls['estado'].reset();
    this.selectedEstadoActual = '';
    this.clienteNombre = '';
    this.caracNombre1  = '';
    this.caracNombre2  = '';
    this.caracNombre3  = '';
    this.caracNombre4  = '';
    this.caracNombre5  = '';
    this.caracNombre6  = '';
    this.caracNombre7  = '';
    this.caracNombre8  = '';
    this.caracNombre9  = '';
    this.caracNombre10  = '';
}

  limpiarCamposNuevo() {
    this.nuevoMovimientoForm.reset();
    this.fechaRegistro = new Date();
  }

  cerrarDialogConfirmar() {
    this.displayDialog = false;
  }

  imprimir() {
    const innerContents = document.getElementById('dialogBar').innerHTML;
    const popupWinindow = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

   buscarCaracteristicasXtipos = function (tipo) {
    this.caracteristicasService.getCaracteristicasTipo(tipo).subscribe(data => {
        switch (tipo) {
          case 1:
            this.caracteristicas1 = data;
            break;
          case 2:
            this.caracteristicas2 = data;
            break;
          case 3:
            this.caracteristicas3 = data;
            break;
          case 4:
            this.caracteristicas4 = data;
            break;
          case 5:
            this.caracteristicas5 = data;
            break;
          case 6:
            this.caracteristicas6 = data;
            break;
          case 7:
            this.caracteristicas7 = data;
            break;
        }
    });

  };
}



