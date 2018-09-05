import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService]
})
export class ClientesComponent implements OnInit {

  clientes: Object[];
  selectedCliente: Object;
  cliente: Object = new Object();
  newCliente: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items : MenuItem[];

  constructor(private authService: AuthService,
  private router: Router,
  private flashMessages: FlashMessagesService,
              private messageService: MessageService) {

}

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      {label: 'Nuevo', icon: 'fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa-download', command: (event) => this.updateClienteContext(this.selectedCliente)},
      {label: 'Borrar', icon: 'fa-trash', command: (event) => this.deleteClienteContext(this.selectedCliente)}
    ];
  }


  showDialogToAdd() {
    this.newCliente = true;
    this.cliente = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.newCliente) {
      this.authService.newCliente(this.cliente).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
        } else {
          this.flashMessages.show('No se pudo registrar el cliente', {cssClass: 'alert-danger', timeout: 4000})
        }
      });
      this.cliente = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.authService.updateCliente(this.cliente).subscribe(data => {
        if (data.success) {
          this.flashMessages.show('Se actualizo el cliente correctamente', {cssClass: 'alert-success', timeout: 4000})
        } else {
          this.flashMessages.show('No se pudo actualizar el cliente', {cssClass: 'alert-danger', timeout: 4000})
        }
      });
      this.cliente = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.authService.deleteCliente(this.cliente).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Se borro el cliente correctamente', {cssClass: 'alert-success', timeout: 4000})
      } else {
        this.flashMessages.show('No se pudo borrar el cliente', {cssClass: 'alert-danger', timeout: 4000})
      }
      this.cliente = null;
      this.displayDialogDelete = false;
      this.cargarTabla();

    });
  }

  cerrarDialog() {

    this.cliente = null;
    this.displayDialog = false;
    this.cargarTabla();

  }

  cerrarDelete() {

    this.cliente = null;
    this.displayDialogDelete = false;
    this.cargarTabla();

  }

  onRowSelect(event) {
    this.newCliente = false;
    this.cliente = this.cloneCliente(event.data);
    this.displayDialog = true;
  }

  cloneCliente(c: Object): Object {
    let cliente = new Object();
    for (let prop in c) {
      cliente[prop] = c[prop];
    }
    return cliente;
  }


  updateClienteContext(cliente: Object) {
    this.cliente=cliente;
    this.newCliente = false;
    this.displayDialog = true;
  }

  deleteClienteContext(cliente: Object) {
    this.cliente=cliente;
    this.newCliente = false;
    this.displayDialogDelete = true;
  }

  findSelectedClienteIndex(): number {
    return this.clientes.indexOf(this.selectedCliente);
  }

  cargarTabla() {
    this.authService.getClientes().subscribe(clientes => {
      this.clientes = clientes;

    }, err => {
      console.log(err);
      return false;
    });
  }



}
