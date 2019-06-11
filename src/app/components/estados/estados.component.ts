import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Estado} from '../../shared/model/estado';
import {EstadosService} from '../../services/estados.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  providers: [MessageService]
})

export class EstadosComponent implements OnInit{

  estados: Estado[];
  selectedEstado: Estado;
  estado: Estado;
  newEstado: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  cols: any[];
  estadoForm: FormGroup;
  nombreDelete: String;
  submitted = false;


  constructor(private authService: AuthService,
              private estadosService: EstadosService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService,
              private fb: FormBuilder) {

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

    this.estadoForm = this.fb.group({
      'nombreValido': new FormControl('', Validators.required),
    });

  }


  showDialogToAdd() {
    this.estadoForm.reset();
    this.newEstado = true;
    this.estado = new Estado();
    this.displayDialog = true;
  }

  save() {

    this.submitted = true;
    if (!this.estadoForm.valid) {
      if (!this.estadoForm.controls['nombreValido'].valid) {
        this.estadoForm.controls['nombreValido'].markAsDirty();
      }
      return;
    }
    if (this.newEstado) {
      this.estadosService.newEstado(this.estado).subscribe(data => {
        if (data) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Registrado correctamente'});
        }
      }, error => {
        this.messageService.add({severity:'error', summary:'Estado', detail:'Error al registrar'});
      });
      this.estado = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.estadosService.updateEstado(this.estado).subscribe(data => {
        if (data) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Actualizado correctamente'});
        }
      }, error => {
        this.messageService.add({severity:'error', summary:'Estado', detail:'Error al actualizar'});
      });
      this.estado = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.estadosService.deleteEstado(this.estado).subscribe(data => {
      if (data) {
        this.messageService.add({severity:'success', summary:'Estado', detail:'Eliminado correctamente'});
      }
      this.estado = null;
      this.displayDialogDelete = false;
      this.cargarTabla();
    }, error => {
      this.messageService.add({severity:'error', summary:'Estado', detail:'Error al eliminar'});
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

  updateEstadoContext(estado: Estado) {
    this.estado = estado;
    this.newEstado = false;
    this.displayDialog = true;
  }

  deleteEstadoContext(estado: Estado) {
    this.nombreDelete = estado.nombre;
    this.estado = estado;
    this.newEstado = false;
    this.displayDialogDelete = true;
  }

  cargarTabla() {
    this.estadosService.getEstados().subscribe(estados => {
      this.estados = estados;

   }, err => {
      console.log(err);
      return false;
    });
  }

}
