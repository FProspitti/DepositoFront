import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../node_modules/primeng/api';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MenuItem} from '../../../../node_modules/primeng/primeng';
import {SelectItem} from 'primeng/api';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Movimiento} from  '../../shared/model/movimiento';


@Component({
  selector: 'app-movimiento',
  templateUrl: './nuevo-movimiento/nuevo-movimiento.component.html',
  providers: [MessageService]
})

export class MovimientosComponent implements OnInit {

  movimientos: Movimiento[];
  clientes: SelectItem[];
  estados: SelectItem[];
  selectedCliente: any;
  selectedEstado: any;
  movimiento: Object = new Object();
  newMovimiento: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  fechaIngreso: Date;
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
    this.fechaIngreso = new Date;



  }
  ngOnInit() {

  }

  save() {
    this.fechaIngreso.setHours(0,0,0,0);

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
        } else {
          this.messageService.add({severity:'error', summary:'Ingreso', detail:'Error al ingresar'});
        }
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
  this.fechaIngreso = new Date;
  this.selectedEstado = new Object;
  this.selectedCliente = new Object;
  this.carac = '';
  this.carac1 = '';
  this.carac2 = '';
  }

}
