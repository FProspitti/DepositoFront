import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../../../node_modules/primeng/primeng';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  unidades: Object[];
  selectedUnidad: Object;
  unidad: Object = new Object();
  newUnidad: boolean;
  displayDialog: boolean;
  items : MenuItem[];

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      // {label: 'Agregar', icon: 'fa-plus', command: (event) => this.showDialogToAdd()},
      // {label: 'Actualizar', icon: 'fa-download', command: (event) => this.updateUserContext(this.selectedUser)},
      // {label: 'Borrar', icon: 'fa-download'},
      // {label: 'Actualizar pass', icon: 'fa-refresh'}
    ];
  }

  showDialogToAdd() {
    this.newUnidad = true;
    this.unidad = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.newUnidad) {
      this.authService.newUnidad(this.unidad).subscribe(data => {
        if (data.success) {
          this.flashMessages.show('Se registro la unidad correctamente', {cssClass: 'alert-success', timeout: 4000})
        } else {
          this.flashMessages.show('No se pudo registrar la unidad', {cssClass: 'alert-danger', timeout: 4000})
        }
      });
      this.unidad = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.authService.updateUnidad(this.unidad).subscribe(data => {
        if (data.success) {
          this.flashMessages.show('Se actualizo la unidad correctamente', {cssClass: 'alert-success', timeout: 4000})
        } else {
          this.flashMessages.show('No se pudo actualizar la unidad', {cssClass: 'alert-danger', timeout: 4000})
        }
      });
      this.unidad = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.authService.deleteUnidad(this.unidad).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Se borro la unidad correctamente', {cssClass: 'alert-success', timeout: 4000})
      } else {
        this.flashMessages.show('No se pudo borrar la unidad', {cssClass: 'alert-danger', timeout: 4000})
      }
      this.unidad = null;
      this.displayDialog = false;
      this.cargarTabla();
    });
  }

  onRowSelect(event) {
    this.newUnidad = false;
    this.unidad = this.cloneUnidad(event.data);
    this.displayDialog = true;
  }

  cloneUnidad(c: Object): Object {
    let unidad = new Object();
    for (let prop in c) {
      unidad[prop] = c[prop];
    }
    return unidad;
  }


  updateUserContext(unidad: Object) {
    this.unidad=unidad;
    this.newUnidad = false;
    this.displayDialog = true;
  }

  findSelectedUnidadIndex(): number {
    return this.unidades.indexOf(this.selectedUnidad);
  }

  cargarTabla() {
    this.authService.getUnidades().subscribe(unidades => {
      this.unidades = unidades;

    }, err => {
      console.log(err);
      return false;
    });
  }

}
