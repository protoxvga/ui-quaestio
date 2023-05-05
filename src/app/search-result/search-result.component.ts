import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  // set up questions structure to save info and display in html
  questions = [{
    "id": "",
    "title": "",
    "body": "",
    "tag": "",
    "date": "",
    "author": "",
    "href": "",
    "answers": ""
  }]

  // set up variable of monthsName, to transform from number to month name
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // set up type, and term variables to store them once gotten from url
  type: string | null
  term: string | null

  constructor(
      private router: Router,
      private searchService: SearchService,
      private activatedRoute: ActivatedRoute
  ) {
    // get the term and type from url, using activatedRoute
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.term = this.activatedRoute.snapshot.paramMap.get('term');

    // divide if the term is title or content, to call either the searchByTitle or searchByContent calls
    if (this.type == 'title') {
      this.searchService.searchByTitle(this.term).subscribe(res => {
        let questions_ = res.questions;
        for (let i = 0; i  < questions_.length; i++) {
          // call the set QuestionsInfo function to set up info
          this.setQuestionsInfo(questions_[i]);
        }
      }, err => {
        alert(err.error.message);
      });
    } else {
      this.searchService.searchByContent(this.term).subscribe(res => {
        let questions_ = res.questions;
        for (let i = 0; i  < questions_.length; i++) {
          // call the set QuestionsInfo function to set up info
          this.setQuestionsInfo(questions_[i]);
        }
      }, err => {
        alert(err.error.message);
      });
    }
  }

  setQuestionsInfo(question: any): void {
    // we divide created_at string to get parts of the info needed
    let day = question.created_at.slice(8,10);
    let month = this.monthNames[question.created_at.slice(5,7) - 1];
    let year = question.created_at.slice(0,4);

    // check if is the first value is empty, so add new info in first position of list, else add new question structure to list
    if (this.questions.length == 1 && this.questions[0].body == "" && this.questions[0].title == "") {
      this.questions[0].id = question._id;
      this.questions[0].title = question.title;
      this.questions[0].body = question.content.substring(0, 20);
      this.questions[0].tag = question.category;
      this.questions[0].date = month + " " + day + ", " + year;
      this.questions[0].author = question.author.firstname + " " + question.author.lastname;
      this.questions[0].href = "/question/" +question._id;
      this.questions[0].answers = question.answers.length;
    } else {
      let question_ = {
        "id": question._id,
        "title": question.title,
        "body": question.content.substring(0, 20),
        "tag": question.category,
        "date": month + " " + day + ", " + year,
        "author": question.author.firstname + " " + question.author.lastname,
        "href": "/question/" + question._id,
        "answers": question.answers.length
      }
      this.questions.push(question_);
    }
  }

  // this function will detect each time the search bar is navigating to this url and will reload the view to show
  // the new results of the search
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }
}
