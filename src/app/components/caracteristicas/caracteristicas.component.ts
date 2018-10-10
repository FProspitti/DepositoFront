import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css'],
  providers: [MessageService]
})
export class CaracteristicasComponent implements OnInit {


  caracteristicas: Object[];
  caracteristicaCombo: SelectItem[];
  selectedCaracteristica: Object;
  selectedCaracteristicaCombo: Object;
  caracteristica: Object = new Object();
  newCaracteristica: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items : MenuItem[];
  cols: any[];


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService) {

  }

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      {label: 'Nuevo', icon: 'fa fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa fa-download', command: (event) => this.updateCaracteristicaContext(this.selectedCaracteristica)},
      {label: 'Borrar', icon: 'fa fa-trash', command: (event) => this.deleteCaracteristicaContext(this.selectedCaracteristica)}
    ];

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'fechaAlta', header: 'Fecha Alta'}
    ];

    this.caracteristicaCombo = [
      {label:'Todos', value: 0 },
      {label:'Caracteristica 1', value: 1 },
      {label:'Caracteristica 2', value: 2 },
      {label:'Caracteristica 3', value: 3 },
      {label:'Caracteristica 4', value: 4 },
      {label:'Caracteristica 5', value: 5 },
      {label:'Caracteristica 6', value: 6 },
      {label:'Caracteristica 7', value: 7 }
    ];

  }

  showDialogToAdd() {
    this.newCaracteristica = true;
    this.caracteristica = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.newCaracteristica) {
      this.authService.newCaracteristica(this.caracteristica).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Caracteristica', detail:'Registrada correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Caracteristica', detail:'Error al registrar'});
        }
      });
      this.caracteristica = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.authService.updateCaracteristica(this.caracteristica).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Caracteristica', detail:'Actualizada correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Caracteristica', detail:'Error al actualizar'});
        }
      });
      this.caracteristica = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.authService.deleteCaracteristica(this.caracteristica).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity:'success', summary:'Caracteristica', detail:'Eliminado correctamente'});
      } else {
        this.messageService.add({severity:'error', summary:'Caracteristica', detail:'Error al eliminar'});
      }
      this.caracteristica = null;
      this.displayDialogDelete = false;
      this.cargarTabla();

    });
  }

  cerrarDialog() {

    this.caracteristica = null;
    this.displayDialog = false;
    this.cargarTabla();

  }

  cerrarDelete() {

    this.caracteristica = null;
    this.displayDialogDelete = false;
    this.cargarTabla();

  }

  onRowSelect(event) {
    this.newCaracteristica = false;
    this.caracteristica = this.cloneCaracteristica(event.data);
    this.displayDialog = true;
  }

  cloneCaracteristica(c: Object): Object {
    let caracteristica = new Object();
    for (let prop in c) {
      caracteristica[prop] = c[prop];
    }
    return caracteristica;
  }


  updateCaracteristicaContext(caracteristica: Object) {
    this.caracteristica = caracteristica;
    this.newCaracteristica = false;
    this.displayDialog = true;
  }

  deleteCaracteristicaContext(caracteristica: Object) {
    this.caracteristica = caracteristica;
    this.newCaracteristica = false;
    this.displayDialogDelete = true;
  }

  findSelectedCaracteristicaIndex(): number {
    return this.caracteristicas.indexOf(this.selectedCaracteristica);
  }

  cargarTabla() {
    this.authService.getCaracteristicas().subscribe(caracteristicas => {
      this.caracteristicas = caracteristicas;

    }, err => {
      console.log(err);
      return false;
    });
  }
}
