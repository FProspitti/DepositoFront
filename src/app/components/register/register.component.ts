import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name: String;
username: String;
email:String;
password:String;

  constructor(private validateService: ValidateService,
              private flashMessages: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
   const user ={
     name: this.name,
     email: this.email,
     username: this.username,
     password: this.password,
   }

   if(!this.validateService.validateRegister(user)){
    this.flashMessages.show('Complete los campos',{cssClass: 'alert-danger', timeout:4000})
     return false;
   }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Validar email',{cssClass: 'alert-danger', timeout:4000})
     return false;
    }
this.authService.registerUser(user).subscribe(data => {
  if(data.success){
    this.flashMessages.show('Se registro el usuario correctamente',{cssClass: 'alert-success', timeout:4000})
  this.router.navigate(['/login']);
  }else{
    this.flashMessages.show('No se pudo registrar el usuario',{cssClass: 'alert-danger', timeout:4000})
    this.router.navigate(['/register']);
  }
});

  }

}
