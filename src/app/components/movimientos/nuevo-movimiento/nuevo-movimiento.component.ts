import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../../node_modules/primeng/api';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MenuItem} from '../../../../../node_modules/primeng/primeng';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
  providers: [MessageService]
})
export class NuevoMovimientoComponent implements OnInit {

  movimientos: Object[];
  clientes: SelectItem[];

  selectedMovimiento: Object;
  movimiento: Object = new Object();
  newMovimiento: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items : MenuItem[];

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService) {


    this.clientes = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'},
    ];

  }
  ngOnInit() {

  }

  save() {
    this.movimiento = new Object();
      this.authService.newMovimiento(this.movimiento).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Registrado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Estado', detail:'Error al registrar'});
        }
      });
  }

}
