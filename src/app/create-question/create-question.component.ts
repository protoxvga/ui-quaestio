import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalService } from "../services/local.service";
import { QuestionsService } from "../services/questions.service";

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
      private localService: LocalService,
      private questionsService: QuestionsService
  ) {
    //check if user that is trying to create a question is logged in
    if (localService.getData('user') == null) {
      //if there is no token saved on localService show an alert and redirect user to login page
      alert("You need to be legged in to ask a question");
      router.navigate(['login']);
    }
  }

  onSubmit(form: NgForm): void {
    //call the createQuestion function stored on the createQuestionService
    this.questionsService.createQuestion(this.form).subscribe(res => {
      //if call success, reset form and redirect to homePage
      form.reset()
      this.router.navigate(['home']);
    }, err => {
      //if there is an error on creating question show error message and reset form
      alert(err.error.message);
      form.reset();
    })
  }

  onCancel(form: NgForm): void {
    form.reset();
    this.router.navigate(['home']);
  }
}
