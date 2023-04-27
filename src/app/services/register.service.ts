import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
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
  registerUser(user: any): Observable<any> {

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
}
