import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Cliente} from '../../shared/model/cliente';
import {ClientesService} from '../../services/clientes.service';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService]
})
export class ClientesComponent implements OnInit {

  clientes: Object[];
  selectedCliente: Cliente;
  selectedCliente1: Object;
  cliente: Object = new Object();
  newCliente: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  cols: any[];
  clienteForm: FormGroup;
  clienteNombre: String;
  submitted = false;

  constructor(private authService: AuthService,
  private clientesService: ClientesService,
  private router: Router,
  private flashMessages: FlashMessagesService,
  private messageService: MessageService,
  private fb: FormBuilder) {

}

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      {label: 'Nuevo', icon: 'fa fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa fa-download', command: (event) => this.updateClienteContext(this.selectedCliente)},
      {label: 'Borrar', icon: 'fa fa-trash', command: (event) => this.deleteClienteContext(this.selectedCliente)}
    ];

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'fechaAlta', header: 'Fecha Alta'}
    ];

    this.clienteForm = this.fb.group({
      'nombreValido': new FormControl('', Validators.required),
      });


  }

  showDialogToAdd() {
    this.clienteForm.reset();
    this.newCliente = true;
    this.cliente = new Object();
    this.displayDialog = true;
  }

  save() {
    this.submitted = true;
    if (!this.clienteForm.valid) {
      if (!this.clienteForm.controls['nombreValido'].valid) {
        this.clienteForm.controls['nombreValido'].markAsDirty();
      }
     return;
    }
     if (this.newCliente) {
      this.clientesService.newCliente(this.cliente).subscribe(data => {
        if (data) {
          this.messageService.add({severity:'success', summary:'Cliente', detail:'Registrado correctamente'});
        }
      }, error => {
        this.messageService.add({severity:'error', summary:'Cliente', detail:'Error al registrar'});
      });
      this.cliente = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.clientesService.updateCliente(this.cliente).subscribe(data => {
        if (data) {
          this.messageService.add({severity:'success', summary:'Cliente', detail:'Actualizado correctamente'});
          }
        }, error => {
        this.messageService.add({severity:'error', summary:'Cliente', detail:'Error al actualizar'});
      });
      this.cliente = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.clientesService.deleteCliente(this.cliente).subscribe(data => {
      if (data) {
        this.messageService.add({severity:'success', summary:'Cliente', detail:'Eliminado correctamente'});
      }
      this.cliente = null;
      this.displayDialogDelete = false;
      this.cargarTabla();

    }, error => {
      this.messageService.add({severity:'error', summary:'Cliente', detail:'Error al eliminar'});
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
  updateClienteContext(cliente: Cliente) {
    this.cliente = cliente;
    this.newCliente = false;
    this.displayDialog = true;
  }

  deleteClienteContext(cliente: Cliente) {
    this.cliente = cliente;
    this.newCliente = false;
    this.clienteNombre = cliente.nombre;
     this.displayDialogDelete = true;
  }

  findSelectedClienteIndex(): number {
    return this.clientes.indexOf(this.selectedCliente);
  }

  cargarTabla() {
    this.clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;

    }, err => {
      console.log(err);
      return false;
    });
  }
}
