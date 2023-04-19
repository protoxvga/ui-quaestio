import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../services/register.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  //set up form object to get information from form
  form = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isExpert: false,
  };

  constructor(
    private registerService: RegisterService,
    private localService: LocalService,
    private router: Router
  ) { }

  onSubmit(): void {
    //call to the registerUser function from the register service
    this.registerService.registerUser(this.form).subscribe(res => {
      //in case the call does not return error
      //create a new user object with just email and password
      const userLogin = {
        email: this.form.email,
        password: this.form.password
      }
      //call to the loginUser function from the login service
      /*this.loginService.loginUser(userLogin).subscribe(res => {
        console.log(res);
        this.localService.saveData("user", res.token);
        this.router.navigate(["home"]);
      });*/
    }, err => {
      alert(err.error.message)
    });
  }

  onReset(form: NgForm): void {
    form.reset();
  }
}
