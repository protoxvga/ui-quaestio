import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LocalService } from "../services/local.service";
import { QuestionsService } from "../services/questions.service";
import { AnsweresService } from "../services/answeres.service";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent {
  // set up id variable to get it from url later
  id: string | null;
  // set up showAnswerForm to false, if user is logged in will see the form
  showAnswereForm = false;
  // set up variable of monthsName, to transform from number to month name
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // set up question structure to save info and display in html
  question = {
    "title": "",
    "body": "",
    "category": "",
    "date": "",
    "author": ""
  }
  showAnswers = false;
  // set up answer structure to save info and display in html
  answers = [{
    "body": "",
    "date": "",
    "upvote": 0,
    "downvote": 0,
    "id" : "",
    "author": "",
  }]
  // set up structure to save body of the new answer created by user logged in
  myAnswer = {
    "body": ""
  }

  constructor(
      private router: Router,
      private localService: LocalService,
      private questionsService: QuestionsService,
      private answersService: AnsweresService,
      private activatedRoute: ActivatedRoute
  ) {
    // get the id from url, using activatedRoute, and check if id is null to return user to home page
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id == null)
      this.router.navigate(['home']);

    // check if user is logged in, if so set showAnswerForm variable to true so user can create questions
    if (localService.getData('user') != null)
      this.showAnswereForm = true;

    // call to the questonsService to get the question with the id
    this.questionsService.getQuestion(this.id).subscribe(res => {
      //set up question info calling setQuestionInfo function
      this.setQuestionInfo(res.question);
      /*this.answersService.getAnswers(this.id).subscribe(res => {
        console.log(res)
      }, err => {
        alert(err.error.message);
      })*/
    }, err => {
      alert(err.error.message);
    })
  }

  setQuestionInfo(question: any): void {
    // get individually all info needed from question and set up to the structure that we have created before
    this.question.title = question.title;
    this.question.body = question.content;
    this.question.category = question.category;
    // we divide created_at string to get parts of the info needed
    let day = question.created_at.slice(8,10);
    let month = this.monthNames[question.created_at.slice(5,7) - 1];
    let year = question.created_at.slice(0,4);
    let hour = question.created_at.slice(11,16);
    this.question.date = month + " " + day + ", " + year + " at " + hour;
    this.question.author = question.author.firstname + " " + question.author.lastname
    // set up answers list with info using setAnswersInfo function
    this.setAnswersInfo(question.answers);
  }

  setAnswersInfo(answers: any): void {
    // check if there is any answer
    if (answers.length > 0) {
      // set showAnswers to true
      this.showAnswers = true;
      // check all values from the answers array
      for (let i = 0; i < answers.length; i++) {
        console.log(answers[i]);
        console.log(answers[i].author);
        // we divide created_at string to get parts of the info needed
        let day = answers[i].created_at.slice(8,10);
        let month = this.monthNames[answers[i].created_at.slice(5,7) - 1];
        let year = answers[i].created_at.slice(0,4);
        let hour = answers[i].created_at.slice(11,16);
        // call getUpAndDownVotes to get the votes of each question
        let votes = this.getUpAndDownVotes(answers[i].votes);
        if (this.answers.length == 1 && this.answers[0].body == "") {
          // check if there is no answer saved yet on array, just change first values
          this.answers[0].body = answers[i].content;
          this.answers[0].date = month + " " + day + ", " + year + " at " + hour;
          this.answers[0].id = answers[i]._id;
          this.answers[0].upvote = votes.upVotes;
          this.answers[0].downvote = votes.downVotes;
          this.answers[0].author = answers[i].author.firstname + " " + answers[i].author.lastname
        } else {
          // else create a new answer structure to add to list
          let answer = {
            "body": answers[i].content,
            "date": month + " " + day + ", " + year + " at " + hour,
            "upvote": votes.upVotes,
            "downvote": votes.downVotes,
            "id": answers[i]._id,
            "author": answers[i].author.firstname + " " + answers[i].author.lastname,
          }
          this.answers.push(answer);
        }
      }
    }
  }

  getUpAndDownVotes(answerVotes: any): {upVotes: number, downVotes: number} {
    let upVotes = 0;
    let downVotes = 0;

    // check all values in votes array from answer and get the positive values to upVotes, and negative to downVotes
    for (let j = 0; j < answerVotes.length; j++) {
      if (answerVotes[j].vote == 1)
        upVotes++;
      else
        downVotes++;
    }
    // return both upVotes count and downVotes count
    return { upVotes: upVotes, downVotes: downVotes };
  }

  onSubmit(form: NgForm): void  {
    // on createAnswer submit, call create answer function from answersService, with the form information, and the id of the question
    this.answersService.createAnswer(this.myAnswer, this.id).subscribe(res => {
      form.reset()
    }, err => {
      alert(err.error.message);
      form.reset();
    })
  }

  onUpVote(answer_id: string): void {
    // on upVote button click we call upVoteAnswer and reload page
    this.answersService.upVoteAnswer(answer_id).subscribe(res => {
      window.location.reload();
    }, err => {
      alert(err.error.message);
    })
  }

  onDownVote(answer_id: string): void {
    // on downVote button click we call downVoteAnswer and reload page
    this.answersService.downVoteAnswer(answer_id).subscribe(res => {
      window.location.reload();
    }, err => {
      alert(err.error.message)
    })
  }
}
