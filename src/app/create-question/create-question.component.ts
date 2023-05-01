import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateQuestionService } from "../services/create-question.service";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  form = {
    title: '',
    tag: '',
    body: '',
  };

  constructor(
      private router: Router,
      private createQuestionService: CreateQuestionService
  ) {}

  onSubmit(form: NgForm): void {
    this.createQuestionService.createQuestion(this.form).subscribe(res => {
      console.log(res);
      form.reset()
      this.createQuestionService.getQuestions().subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }, err => {
      alert(err.error.message);
      form.reset();
    })
    /*this.loginService.loginUser(this.form).subscribe(res => {
      console.log(res);
      this.localService.saveData("user", res.token);
      form.reset();
      this.router.navigate(["home"]);
    }, err => {
      alert(err.error.message)
      form.reset();
    });*/
  }
}
