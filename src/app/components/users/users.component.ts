import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  usuarios: Object[];
  selectedUser: Object;
  selectedUser1: Object;
  user: Object = new Object();
  newUser: boolean;
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
      {label: 'Agregar', icon: 'fa fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa fa-download', command: (event) => this.updateUserContext(this.selectedUser)},
      {label: 'Borrar', icon: 'fa fa-trash', command: (event) => this.deleteUsuarioContext(this.selectedUser)},
      {label: 'Actualizar pass', icon: 'fa fa-refresh'}
    ];

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Email' },
      { field: 'username', header: 'Nombre Usuario' }
    ];
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.newUser) {
      this.authService.registerUser(this.user).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Usuario', detail:'Registrado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Usuario', detail:'Error al registrar'});
        }
      });
      this.user = null;
      this.displayDialog = false;
      this.cargarTabla();
    } else {
      this.authService.updateUser(this.user).subscribe(data => {
        if (data.success) {
          this.messageService.add({severity:'success', summary:'Usuario', detail:'Actualizado correctamente'});
        } else {
          this.messageService.add({severity:'error', summary:'Usuario', detail:'Error al actualizar'});
        }
      });
      this.user = null;
      this.displayDialog = false;
      this.cargarTabla();
    }
  }

  delete() {
    this.authService.deleteUser(this.user).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity:'success', summary:'Usuario', detail:'Borrado correctamente'});
      } else {
        this.messageService.add({severity:'error', summary:'Usuario', detail:'Error al borrar'});
      }
      this.user = null;
      this.displayDialog = false;
      this.displayDialogDelete = false;
      this.cargarTabla();
    });
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
  }

  cloneUser(c: Object): Object {
    let user = new Object();
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }


  updateUserContext(user: Object) {
    this.user=user;
    this.newUser = false;
    this.displayDialog = true;
  }

  findSelectedUserIndex(): number {
    return this.usuarios.indexOf(this.selectedUser);
  }

  deleteUsuarioContext(user: Object) {
    this.user = user;
    this.newUser = false;
    this.displayDialogDelete = true;
  }


  cargarTabla() {
    this.authService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;

    }, err => {
      console.log(err);
      return false;
    });
  }

  cerrarDelete() {

    this.user = null;
    this.displayDialogDelete = false;
    this.cargarTabla();

  }

}
