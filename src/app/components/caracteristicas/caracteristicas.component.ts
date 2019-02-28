import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {Caracteristica} from  '../../shared/model/caracteristica';
import {CaracteristicaSelect} from  '../../shared/model/caracteristicaSelect';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {CaracteristicasService} from '../../services/caracteristicas.service';


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
  selectedCaracteristicaCombo:  CaracteristicaSelect;
  selectedCaracteristicaComboSave: CaracteristicaSelect;
  caracteristica: Caracteristica;
  newCaracteristica: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items: MenuItem[];
  cols: any[];
  caracteristicaForm: FormGroup;
  caracteristicaConsultaForm: FormGroup;
  nombreDelete: String;
  tipoDelete: String;
  submitted = false;


  constructor(private authService: AuthService,
              private caracteristicasService: CaracteristicasService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService,
              private fb: FormBuilder) {

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


    this.caracteristicaForm = this.fb.group({
      'nombreValido': new FormControl('', Validators.required),
      'caracteristicaSelect': new FormControl('', Validators.required),
    });

    this.caracteristicaConsultaForm = this.fb.group({
      'caracteristicaSelectFiltro': new FormControl('', Validators.required),
    });

  }

  showDialogToAdd() {
    this.caracteristicaForm.reset();
    this.newCaracteristica = true;
    this.caracteristica = new Caracteristica();
    this.selectedCaracteristicaComboSave = null;
    this.displayDialog = true;
  }

  save() {
    this.submitted = true;
    if (!this.caracteristicaForm.valid) {
      if (!this.caracteristicaForm.controls['nombreValido'].valid) {
        this.caracteristicaForm.controls['nombreValido'].markAsDirty();
      }
      if (!this.caracteristicaForm.controls['caracteristicaSelect'].valid) {
        this.caracteristicaForm.controls['caracteristicaSelect'].markAsDirty();
      }
      return;
    }

      this.caracteristica.tipo = this.selectedCaracteristicaComboSave.tipo;
    if (this.newCaracteristica) {
      this.caracteristicasService.newCaracteristica(this.caracteristica).subscribe(data => {
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
      this.caracteristicasService.updateCaracteristica(this.caracteristica).subscribe(data => {
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
    this.caracteristicasService.deleteCaracteristica(this.caracteristica).subscribe(data => {
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

  updateCaracteristicaContext(caracteristica: Caracteristica) {
    this.caracteristica = caracteristica;
    this.selectedCaracteristicaComboSave = this.caracteristicaComboSave.find( caracter => caracter.tipo === this.caracteristica.tipo );
    this.newCaracteristica = false;
    this.displayDialog = true;
  }

  deleteCaracteristicaContext(caracteristica: Caracteristica) {
    this.caracteristica = caracteristica;
    this.selectedCaracteristicaComboSave = this.caracteristicaComboSave.find( caracter => caracter.tipo === this.caracteristica.tipo );
    this.nombreDelete = caracteristica.nombre;
    this.tipoDelete = 'Caracteristica ' + caracteristica.tipo.toString();
    this.newCaracteristica = false;
    this.displayDialogDelete = true;
  }

  buscarCaracteristicas() {
    if (!this.caracteristicaConsultaForm.valid) {
      if (!this.caracteristicaConsultaForm.controls['caracteristicaSelectFiltro'].valid) {
        this.caracteristicaConsultaForm.controls['caracteristicaSelectFiltro'].markAsDirty();
      }
      return;
    }

    const caracteristicaFiltro = new Object({
      tipo : this.selectedCaracteristicaCombo.tipo
    });

    this.caracteristicasService.getCaracteristicasFiltro(caracteristicaFiltro).subscribe(data => {
      this.caracteristicas = data;
    });
  }
}
