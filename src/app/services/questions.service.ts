import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(
      private http: HttpClient,
      private localService: LocalService
  ) { }

  /** POST call to create question from user **/
  createQuestion(newQuestion: any): Observable<any> {
    // get token from user logged in and add to Bearer string
    let token = "Bearer " + this.localService.getData("user")
    // set up body with information from form
    const body = {
      "title": newQuestion.title,
      "content": newQuestion.body,
      "category": newQuestion.tag
    }
    // set up header with token information
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': token,
      })
    };
    const url = "https://api-quaestio.pierre-perrin.dev/questions"

    // return the post call
    return this.http.post(url, body, httpOptions);
  }

  /** GET call to get all questions **/
  getQuestions(): Observable<any> {
    // get token from user logged in and add to Bearer string
    let token = "Bearer " + this.localService.getData("user")
    // set up header with token information
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': token,
      })
    };
    const url = "https://api-quaestio.pierre-perrin.dev/questions"

    return this.http.get(url, httpOptions);
  }

  /** GET call to get specific question **/
  getQuestion(question_id: any): Observable<any> {
    // set url to  be sent with question id
    const url = "https://api-quaestio.pierre-perrin.dev/questions/" + question_id

    return this.http.get(url)
  }
}
