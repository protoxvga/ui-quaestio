import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class AnsweresService {

  constructor(
      private http: HttpClient,
      private localService: LocalService
  ) { }

  /** POST call to create answer from user **/
  createAnswer(newAnswer: any, question: any): Observable<any> {
    // get token from user logged in and add to Bearer string
    let token = "Bearer " + this.localService.getData("user")
    // set up body with information from form
    const body = {
      "content": newAnswer.body
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
    const url = "https://api-quaestio.pierre-perrin.dev/answers?id=" + question;

    // return the post call
    return this.http.post(url, body, httpOptions);
  }

    /** GET all answers from a question **/
  getAnswers(question_id: any): Observable<any> {
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
      const url = "https://api-quaestio.pierre-perrin.dev/answers?id=" + question_id;

      // return the post call
      return this.http.get(url, httpOptions);
    }

  /** PUT call to add an upvote to answer **/
  upVoteAnswer(answer_id: any): Observable<any> {
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
    const url = "https://api-quaestio.pierre-perrin.dev/up-vote?id=" + answer_id;

    // return the post call
    return this.http.put(url, null, httpOptions);
  }

  /** PUT call to add a downvote to answer **/
  downVoteAnswer(answer_id: any): Observable<any> {
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
    const url = "https://api-quaestio.pierre-perrin.dev/down-vote?id=" + answer_id;

    // return the post call
    return this.http.put(url, null, httpOptions);
  }
}