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



@Component({
  selector: 'app-movimiento',
  templateUrl: './nuevo-movimiento/nuevo-movimiento.component.html',
  providers: [MessageService]
})

export class MovimientosComponent implements OnInit {

  movimientos: Movimiento[];
  clientes: SelectItem[];
  estados: SelectItem[];
  estado: any;
  selectedCliente: any;
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
  selectedEstadoActual: any;
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


  constructor(public authService: AuthService,
              public router: Router,
              public flashMessages: FlashMessagesService,
              public messageService: MessageService) {

    for (var i = 1; i <= 7; i++) {
      this.buscarCaracteristicasXtipos(i);
    }
    this.traerClientes();
    this.traerEstados();
    this.fecha = new Date;
    this.fechaRegistro = new Date;

  }

  ngOnInit() {

  }

  save() {
    this.messageService.clear('c');
    this.fechaRegistro.setHours(0, 0, 0, 0);

    this.authService.getEstadoNombre('Registro').subscribe(estado => {
      this.estado = estado;

      var movimient = new Object();
      movimient = {
        cliente: this.selectedCliente,
        estado: this.estado,
        fechaRegistro: this.fechaRegistro
      };

      this.authService.newMovimiento(movimient).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Ingreso', detail: 'Creado correctamente'});
          this.movimiento = data.mov;
          this.limpiarCampos();
          this.displayDialog = true;
        } else {
          this.messageService.add({severity: 'error', summary: 'Ingreso', detail: 'Error al ingresar'});
        }
      });
    });


  }

  traerClientes() {
    this.authService.getClientes().subscribe(clientes => {
      this.clientes = clientes;

    }, err => {
      console.log(err);
      return false;
    });
  }

  traerEstados() {
    this.authService.getEstados().subscribe(estados => {
      this.estados = estados;
    }, err => {
      console.log(err);
      return false;
    });
  }

  limpiarCampos() {
    this.fecha = new Date;
    this.selectedEstado = new Object;
    this.selectedCliente = new Object;
    this.selectedEstadoActual = '';
    this.selectedCaracteristica1 = null;
    this.selectedCaracteristica2 = null;
    this.selectedCaracteristica3 = null;
    this.selectedCaracteristica4 = null;
    this.selectedCaracteristica5 = null;
    this.selectedCaracteristica6 = null;
    this.selectedCaracteristica7 = null;
    this.caracteristica8 = '';
    this.caracteristica9 = '';
    this.caracteristica10 = '';
  }

  cerrarDialogConfirmar() {
    this.displayDialog = false;
  }

  imprimir() {
    const innerContents = document.getElementById("dialogBar").innerHTML;
    const popupWinindow = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

  buscarCaracteristicasXTipo1() {
    // debugger;
    // var i = 1;
    // for (i; i <= 7; i++) {
    //   //  const caracteristica = new Object({
    //   //    tipo: i
    //   //  });
    //   // this.authService.getCaracteristicasFiltro(caracteristica).subscribe(data => {
    //   //   data = data;
    //   //  });
    //   this.buscarCaracteristicasXtipos(i);
    //   debugger;
    //   switch (i) {
    //     case 1:
    //       this.caracteristicas1 = this.caractetistica;
    //       break;
    //     case 2:
    //       this.caracteristicas2 = this.caractetistica;
    //       break;
    //     case 3:
    //       this.caracteristicas3 = this.caractetistica;
    //       break;
    //     case 4:
    //       this.caracteristicas4 = this.caractetistica;
    //       break;
    //     case 5:
    //       this.caracteristicas5 = this.caractetistica;
    //       break;
    //     case 6:
    //       this.caracteristicas6 = this.caractetistica;
    //       break;
    //     case 7:
    //       this.caracteristicas7 = this.caractetistica;
    //       break;
    //   }
    // }

    // this.buscarCaracteristicasXtipos(1);

  }

  buscarCaracteristicasXtipos = function (tipo) {
    debugger;
    this.authService.getCaracteristicasTipo(tipo).subscribe(data => {
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


