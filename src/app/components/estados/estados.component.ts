import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  providers: [MessageService]
})

export class EstadosComponent implements OnInit{

  estados: Object[];
  selectedEstado: Object;
  selectedEstado1: Object;
  estado: Object = new Object();
  newEstado: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  cols: any[];


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService
             ) {

  }

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      {label: 'Nuevo', icon: 'fa fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa fa-download', command: (event) => this.updateEstadoContext(this.selectedEstado)},
      {label: 'Borrar', icon: 'fa fa-trash', command: (event) => this.deleteEstadoContext(this.selectedEstado)}

    ];

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'fechaAlta', header: 'Fecha Alta'}
    ];

  }


  showDialogToAdd() {
    this.newEstado = true;
    this.estado = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.newEstado) {
      this.authService.newEstado(this.estado).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Registrado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Estado', detail:'Error al registrar'});
        }
      });
      this.estado = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.authService.updateEstado(this.estado).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Actualizado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Estado', detail:'Error al actualizar'});
        }
      });
      this.estado = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.authService.deleteEstado(this.estado).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity:'success', summary:'Estado', detail:'Eliminado correctamente'});
      } else {
        this.messageService.add({severity:'error', summary:'Estado', detail:'Error al eliminar'});
      }
      this.estado = null;
      this.displayDialogDelete = false;
      this.cargarTabla();

    });
  }

  cerrarDialog() {

    this.estado = null;
    this.displayDialog = false;
    this.cargarTabla();

  }

  cerrarDelete() {

    this.estado = null;
    this.displayDialogDelete = false;
    this.cargarTabla();

  }

  onRowSelect(event) {
    this.newEstado = false;
    this.estado = this.cloneEstado(event.data);
    this.displayDialog = true;
  }

  cloneEstado(c: Object): Object {
    let estado = new Object();
    for (let prop in c) {
      estado[prop] = c[prop];
    }
    return estado;
  }


  updateEstadoContext(estado: Object) {
    this.estado=estado;
    this.newEstado = false;
    this.displayDialog = true;
  }

  deleteEstadoContext(estado: Object) {
    this.estado = estado;
    this.newEstado = false;
    this.displayDialogDelete = true;
  }

  findSelectedEstadoIndex(): number {
    return this.estados.indexOf(this.selectedEstado);
  }

  cargarTabla() {
    this.authService.getEstados().subscribe(estados => {
      this.estados = estados;

   }, err => {
      console.log(err);
      return false;
    });
  }

}
