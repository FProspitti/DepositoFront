import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService) {
}

  ngOnInit() {
  }

  onLoginSubmit() {
    const  user = {
      username: this.username,
      password: this.password
    }
    debugger;
    this.authService.authenticateUser(user).subscribe((data: any) => {

    if (data) {
  this.authService.storeUserData(data.token, data.user);
      this.flashMessages.show('Ingreso Correcto',{cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/dashboard']);
    } else {
      this.flashMessages.show(data.msg,{cssClass: 'alert-danger', timeout: 5000})
      this.router.navigate(['/login']);
    }
    }, error => {
      this.flashMessages.show("Error",{cssClass: 'alert-danger', timeout: 5000})
      console.log(error);
      debugger;
    });
  }
}
