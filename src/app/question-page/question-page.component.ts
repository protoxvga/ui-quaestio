import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalService } from "../services/local.service";
import { QuestionsService } from "../services/questions.service";
import { AnsweresService } from "../services/answeres.service";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent {
//644f004420d9f95a5ee428a8
  showAnswereForm = false;
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  question = {
    "title": "",
    "body": "",
    "category": "",
    "date": "",
    "author": ""
  }
  answers = [{
    "body": "",
    "date": ""
  }]
  myAnswer = {
    "body": ""
  }

  constructor(
      private router: Router,
      private localService: LocalService,
      private questionsService: QuestionsService,
      private answersService: AnsweresService
  ) {
    if (localService.getData('user') != null) {
      this.showAnswereForm = true;
    }

    this.questionsService.getQuestion("644f004420d9f95a5ee428a8").subscribe(res => {
      this.question.title = res.question.title;
      this.question.body = res.question.content;
      this.question.category = res.question.category;
      let day = res.question.created_at.slice(8,10);
      let month = this.monthNames[res.question.created_at.slice(5,7) - 1];
      let year = res.question.created_at.slice(0,4);
      let hour = res.question.created_at.slice(11,16);
      this.question.date = month + " " + day + ", " + year + " at " + hour;
      this.question.author = res.question.author.firstname + " " + res.question.author.lastname
      if (res.question.answers.length > 0) {
        for (let i = 0; i < res.question.answers.length; i++) {
          let day = res.question.answers[i].created_at.slice(8,10);
          let month = this.monthNames[res.question.answers[i].created_at.slice(5,7) - 1];
          let year = res.question.answers[i].created_at.slice(0,4);
          let hour = res.question.answers[i].created_at.slice(11,16);
          if (this.answers.length == 1 && this.answers[0].body == "") {
            this.answers[0].body = res.question.answers[i].content;
            this.answers[0].date = month + " " + day + ", " + year + " at " + hour;
          } else {
            let answer = {
              "body": res.question.answers[i].content,
              "date": month + " " + day + ", " + year + " at " + hour,
            }
            this.answers.push(answer);
          }
        }
      }
      console.log(res.question.answers)
      console.log(res.question.author)
      //this.router.navigate(['home']);
    }, err => {
      console.log(err)
    })
  }

  onSubmit(form: NgForm): void  {
    this.answersService.createQuestion(this.myAnswer, "644f004420d9f95a5ee428a8").subscribe(res => {
      form.reset()
    }, err => {
      alert(err.error.message);
      form.reset();
    })
  }
}
