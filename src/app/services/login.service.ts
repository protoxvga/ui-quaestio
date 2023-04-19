import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /*onSubmit(user: any) Observa {
    console.log(user);
    this.http.get<any>("https://api-quaestio.pierre-perrin.dev/auth/login", user)
    .subscribe(res=>{
      console.log(res);
      //alert('SIGNIN SUCCESFUL');
      //this.router.navigate(["login"])
    })
  }*/

  /** POST user to login */
  loginUser(user: any): Observable<any> {
    const body = {
      "email": user.email,
      "password": user.password
    }
    const url = "https://api-quaestio.pierre-perrin.dev/auth/login";

    return this.http.post(url, body, this.httpOptions);
  }
}
