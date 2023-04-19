import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  //set up form object to get information from form
  form = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private localService: LocalService,
    private router: Router
  ) { }

  onSubmit(form: NgForm): void {
    //call to the registerUser function from the register service
    this.loginService.loginUser(this.form).subscribe(res => {
      //in case the call does not return error
      console.log(res);
      this.localService.saveData("user", res.token);
      form.reset();
      this.router.navigate(["home"]);
    }, err => {
      alert(err.error.message)
      form.reset();
    });
  }

  /*onReset(form: NgForm): void {
    form.reset();
  }*/
}
