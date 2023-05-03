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
    "date": "",
    "upvote": 0,
    "downvote": 0,
    "id" : ""
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
      this.setQuestionInfo(res.question);
    }, err => {
      alert(err.error.message);
    })
  }

  setQuestionInfo(question: any): void {
    this.question.title = question.title;
    this.question.body = question.content;
    this.question.category = question.category;
    let day = question.created_at.slice(8,10);
    let month = this.monthNames[question.created_at.slice(5,7) - 1];
    let year = question.created_at.slice(0,4);
    let hour = question.created_at.slice(11,16);
    this.question.date = month + " " + day + ", " + year + " at " + hour;
    this.question.author = question.author.firstname + " " + question.author.lastname
    this.setAnswersInfo(question.answers);
  }

  setAnswersInfo(answers: any): void {
    if (answers.length > 0) {
      for (let i = 0; i < answers.length; i++) {
        let day = answers[i].created_at.slice(8,10);
        let month = this.monthNames[answers[i].created_at.slice(5,7) - 1];
        let year = answers[i].created_at.slice(0,4);
        let hour = answers[i].created_at.slice(11,16);
        let votes = this.getUpAndDownVotes(answers[i].votes);
        if (this.answers.length == 1 && this.answers[0].body == "") {
          this.answers[0].body = answers[i].content;
          this.answers[0].date = month + " " + day + ", " + year + " at " + hour;
          this.answers[0].id = answers[i]._id;
          this.answers[0].upvote = votes.upVotes;
          this.answers[0].downvote = votes.downVotes;
        } else {
          let answer = {
            "body": answers[i].content,
            "date": month + " " + day + ", " + year + " at " + hour,
            "upvote": votes.upVotes,
            "downvote": votes.downVotes,
            "id": answers[i]._id
          }
          this.answers.push(answer);
        }
      }
    }
  }

  getUpAndDownVotes(answerVotes: any): {upVotes: number, downVotes: number} {
    let upVotes = 0;
    let downVotes = 0;
    for (let j = 0; j < answerVotes.length; j++) {
      if (answerVotes[j].vote == 1)
        upVotes++;
      else
        downVotes++;
    }
    return { upVotes: upVotes, downVotes: downVotes };
  }

  onSubmit(form: NgForm): void  {
    this.answersService.createAnswer(this.myAnswer, "644f004420d9f95a5ee428a8").subscribe(res => {
      form.reset()
    }, err => {
      alert(err.error.message);
      form.reset();
    })
  }

  onUpVote(answer_id: string): void {
    this.answersService.upVoteAnswer(answer_id).subscribe(res => {
      window.location.reload();
    }, err => {
      alert(err.error.message);
    })
  }

  onDownVote(answer_id: string): void {
    this.answersService.downVoteAnswer(answer_id).subscribe(res => {
      window.location.reload();
    }, err => {
      alert(err.error.message)
    })
  }
}
