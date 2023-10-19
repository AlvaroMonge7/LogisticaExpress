import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    const loginUrl = 'http://localhost:3000/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = {
      name: name,
      password: password
    };
    return this.http.post<any>(loginUrl, credentials, httpOptions);
  }
}
