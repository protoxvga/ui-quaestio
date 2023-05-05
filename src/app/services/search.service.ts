import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
      private http: HttpClient,
      private localService: LocalService
  ) { }

  /** GET call for search by title **/
  searchByTitle(search: any): Observable<any> {
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
    const url = "https://api-quaestio.pierre-perrin.dev/questions?title=" + search;

    // return the post call
    return this.http.get(url, httpOptions);
  }

  /** GET call for search by title **/
  searchByContent(search: any): Observable<any> {
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
    const url = "https://api-quaestio.pierre-perrin.dev/questions?content=" + search;

    // return the post call
    return this.http.get(url, httpOptions);
  }
}
