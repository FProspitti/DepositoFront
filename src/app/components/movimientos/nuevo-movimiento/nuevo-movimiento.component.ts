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

  selectedCliente: Object;
  movimiento: Object = new Object();
  newMovimiento: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  items : MenuItem[];
  value : Date;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService) {


    this.traerClientes();

  }
  ngOnInit() {

  }

  save() {
    // this.movimiento = new Object();
    // const movimient = this.movimiento;

    var movimient = new Object();
    movimient = {
      cliente : this.selectedCliente
    };

      this.authService.newMovimiento(movimient).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Estado', detail:'Registrado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Estado', detail:'Error al registrar'});
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

}
