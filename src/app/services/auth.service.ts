import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // set up default headers to be sent
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    })
  };

  constructor(private http: HttpClient) { }

  /** POST user to login **/
  registerUser(user: any): Observable<any> {
    // set up body with information from form
    const body = {
      "firstname": user.firstname,
      "lastname": user.lastname,
      "email": user.email,
      "password": user.password,
      "isExpert": user.isExpert
    }
    const url = "https://api-quaestio.pierre-perrin.dev/auth/register";

    return this.http.post(url, body, this.httpOptions);
  }

  /** POST user to login **/
  loginUser(user: any): Observable<any> {
    // set up body with information from form
    const body = {
      "email": user.email,
      "password": user.password
    }
    const url = "https://api-quaestio.pierre-perrin.dev/auth/login";

    return this.http.post(url, body, this.httpOptions);
  }
}
