import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {SelectItem} from 'primeng/api';
import {Caracteristica} from  '../../shared/model/caracteristica';
import {CaracteristicaSelect} from  '../../shared/model/caracteristicaSelect';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css'],
  providers: [MessageService]
})
export class CaracteristicasComponent implements OnInit {


  caracteristicas: Caracteristica[];
  caracteristicaCombo: CaracteristicaSelect[];
  caracteristicaComboSave: CaracteristicaSelect[];
  selectedCaracteristica: Caracteristica;
  selectedCaracteristicaCombo: CaracteristicaSelect;
  selectedCaracteristicaComboSave: CaracteristicaSelect;
  caracteristica: Caracteristica;
  newCaracteristica: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  cols: any[];


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService) {

  }

  ngOnInit() {

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
      {nombre:'Todos', tipo: 0 },
      {nombre:'Caracteristica 1', tipo: 1 },
      {nombre:'Caracteristica 2', tipo: 2 },
      {nombre:'Caracteristica 3', tipo: 3 },
      {nombre:'Caracteristica 4', tipo: 4 },
      {nombre:'Caracteristica 5', tipo: 5 },
      {nombre:'Caracteristica 6', tipo: 6 },
      {nombre:'Caracteristica 7', tipo: 7 }
    ];

    this.caracteristicaComboSave = [
      {nombre:'Caracteristica 1', tipo: 1 },
      {nombre:'Caracteristica 2', tipo: 2 },
      {nombre:'Caracteristica 3', tipo: 3 },
      {nombre:'Caracteristica 4', tipo: 4 },
      {nombre:'Caracteristica 5', tipo: 5 },
      {nombre:'Caracteristica 6', tipo: 6 },
      {nombre:'Caracteristica 7', tipo: 7 }
    ];


  }

  showDialogToAdd() {
    this.newCaracteristica = true;
    this.caracteristica = new Caracteristica();
    this.selectedCaracteristicaComboSave = null;
    this.displayDialog = true;
  }

  save() {
      this.caracteristica.tipo = this.selectedCaracteristicaComboSave.tipo;
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
      this.buscarCaracteristicas();
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
      this.buscarCaracteristicas();
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
      this.buscarCaracteristicas();

    });
  }

  cerrarDialog() {

    this.caracteristica = null;
    this.displayDialog = false;
    this.buscarCaracteristicas();

  }

  cerrarDelete() {

    this.caracteristica = null;
    this.displayDialogDelete = false;
    this.buscarCaracteristicas();

  }



  cloneCaracteristica(c: Object): Object {
    let caracteristica = new Object();
    for (let prop in c) {
      caracteristica[prop] = c[prop];
    }
    return caracteristica;
  }


  updateCaracteristicaContext(caracteristica: Caracteristica) {
    this.caracteristica = caracteristica;
    this.selectedCaracteristicaComboSave = this.caracteristicaComboSave.find( caracter => caracter.tipo === this.caracteristica.tipo );
    this.newCaracteristica = false;
    this.displayDialog = true;
  }

  deleteCaracteristicaContext(caracteristica: Caracteristica) {
    this.caracteristica = caracteristica;
    this.selectedCaracteristicaComboSave = this.caracteristicaComboSave.find( caracter => caracter.tipo === this.caracteristica.tipo );
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


  buscarCaracteristicas() {
    const caracteristicaFiltro = new Object({
      tipo : this.selectedCaracteristicaCombo.tipo
    });

    this.authService.getCaracteristicasFiltro(caracteristicaFiltro).subscribe(data => {
      this.caracteristicas = data;
    });
  }
}
