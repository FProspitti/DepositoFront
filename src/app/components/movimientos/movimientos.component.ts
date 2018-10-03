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
  selectedEstadoActual: any;
  movimiento: Movimiento;
  newMovimiento: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  fecha: Date;
  fechaRegistro: Date;
  es: any;
  carac: string;
  carac1: string;
  carac2: string;
  movform: FormGroup;



  constructor(public authService: AuthService,
              public router: Router,
              public flashMessages: FlashMessagesService,
              public messageService: MessageService) {


    this.traerClientes();
    this.traerEstados();
    this.fecha = new Date;
    this.fechaRegistro = new Date;



  }
  ngOnInit() {

  }

  save() {
    this.messageService.clear('c');
    this.fechaRegistro.setHours(0,0,0,0);

    this.authService.getEstadoNombre('Registro').subscribe(estado => {
      this.estado = estado;

      var movimient = new Object();
      movimient = {
        cliente : this.selectedCliente,
        estado : this.estado,
        fechaRegistro : this.fechaRegistro
      };

      this.authService.newMovimiento(movimient).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Ingreso', detail:'Creado correctamente'});
          this.movimiento = data.mov;
          this.limpiarCampos();
          this.displayDialog = true;
        } else {
          this.messageService.add({severity:'error', summary:'Ingreso', detail:'Error al ingresar'});
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

  limpiarCampos(){
  this.fecha = new Date;
  this.selectedEstado = new Object;
  this.selectedCliente = new Object;
  this.selectedEstadoActual = new Object;
  this.carac = '';
  this.carac1 = '';
  this.carac2 = '';
  }

  cerrarDialogConfirmar() {
    this.displayDialog = false;
  }

  imprimir(){

    const innerContents = document.getElementById("dialogBar").innerHTML;
    const popupWinindow = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
