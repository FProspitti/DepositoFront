import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {MenuItem} from 'primeng/primeng';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  usuarios: Object[];
  selectedUser: Object;
  user: any;
  newUser: boolean;
  displayDialog: boolean;
  displayDialogDelete: boolean;
  displayDialogPass: boolean;
  items: MenuItem[];
  cols: any[];
  submitted = false;
  userForm: FormGroup;
  userFormUpdatePass: FormGroup;
  usuarioNombre: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.cargarTabla();
    this.items = [
      {label: 'Agregar', icon: 'fa fa-plus', command: (event) => this.showDialogToAdd()},
      {label: 'Actualizar', icon: 'fa fa-download', command: (event) => this.updateUserContext(this.selectedUser)},
      {label: 'Borrar', icon: 'fa fa-trash', command: (event) => this.deleteUsuarioContext(this.selectedUser)},
      {label: 'Actualizar pass', icon: 'fa fa-refresh', command: (event) => this.updateUserPassContext(this.selectedUser)},
    ];

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Email' },
      { field: 'username', header: 'Nombre Usuario' }
    ];

    this.userForm = this.fb.group({
      'nombreYApeUser': new FormControl('', Validators.required),
      'emailUser': new FormControl('', Validators.required),
      'nombreUser': new FormControl('', Validators.required),
      'passUser': new FormControl('', Validators.required),
    });

    this.userFormUpdatePass = this.fb.group({
      'passUserUpdate': new FormControl('', Validators.required),
    });

  }

  showDialogToAdd() {
    this.userForm.reset();
    this.newUser = true;
    this.user = new Object();
    this.displayDialog = true;
  }

  save() {
    this.submitted = true;
    if (this.newUser) {

      if (!this.userForm.valid) {
        if (!this.userForm.controls['nombreYApeUser'].valid) {
          this.userForm.controls['nombreYApeUser'].markAsDirty();
        }
        if (!this.userForm.controls['emailUser'].valid) {
          this.userForm.controls['emailUser'].markAsDirty();
        }
        if (!this.userForm.controls['nombreUser'].valid) {
          this.userForm.controls['nombreUser'].markAsDirty();
        }
        if (!this.userForm.controls['passUser'].valid) {
          this.userForm.controls['passUser'].markAsDirty();
        }
        return;
      }

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
        if (!this.userForm.controls['nombreYApeUser'].valid) {
          this.userForm.controls['nombreYApeUser'].markAsDirty();
          return;
        }
        if (!this.userForm.controls['emailUser'].valid) {
          this.userForm.controls['emailUser'].markAsDirty();
          return;
        }
        if (!this.userForm.controls['nombreUser'].valid) {
          this.userForm.controls['nombreUser'].markAsDirty();
          return;
        }
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

  updatePass() {
    if (!this.userFormUpdatePass.valid) {
      if (!this.userFormUpdatePass.controls['passUserUpdate'].valid) {
        this.userFormUpdatePass.controls['passUserUpdate'].markAsDirty();
      }
      return;
    }
    this.authService.updateUserPass(this.user).subscribe(data => {
      if (data.success) {
        this.messageService.add({severity:'success', summary:'Pass', detail:'Actualizado correctamente'});
      } else {
        this.messageService.add({severity:'error', summary:'Pass', detail:'Error al actualizar'});
      }
    });
    this.user = null;
    this.displayDialogPass = false;
    this.cargarTabla();
  }

  updateUserContext(user: Object) {
    this.user = user;
    this.newUser = false;
    this.displayDialog = true;
  }

  deleteUsuarioContext(user: any) {
    this.usuarioNombre = user.name;
    this.user = user;
    this.newUser = false;
    this.displayDialogDelete = true;
  }

  updateUserPassContext(user: any) {
    this.userFormUpdatePass.reset();
    this.user = user;
    this.user.password = '';
    this.newUser = false;
    this.displayDialogPass = true;
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

  cerrarUpdatePass() {

    this.user = null;
    this.displayDialogPass = false;
    this.cargarTabla();

  }

  cerrarDialog() {
    this.user = null;
    this.displayDialog = false;
    this.cargarTabla();

  }

}
