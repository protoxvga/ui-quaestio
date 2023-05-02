import { Injectable } from '@angular/core';
import {Observable, subscribeOn} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {LocalService} from "./local.service";
@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {
  constructor(
      private http: HttpClient,
      private localService: LocalService
  ) { }

  createQuestion(newQuestion: any): Observable<any> {
    const body = {
      "title": newQuestion.title,
      "content": newQuestion.body,
      "category": newQuestion.tag
    }

    let token = "Bearer " + this.localService.getData("user")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': token,
      })
    };

    const url = "https://api-quaestio.pierre-perrin.dev/questions"

    return this.http.post(url, body, httpOptions);
  }

  getQuestions(): Observable<any> {
    let token = "Bearer " + this.localService.getData("user")
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
}
