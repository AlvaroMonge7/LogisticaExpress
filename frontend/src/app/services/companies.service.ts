import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  companies(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/companies');
  }

  deleteCompany(id_company: number): Observable<any> {
    const deleteUrl = `http://localhost:3000/delete_company/${id_company}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(deleteUrl, httpOptions);
  }

  addCompany(name:string, postal_code:string){
    const loginUrl = 'http://localhost:3000/add_company';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = {
      name: name,
      postal_code:postal_code
    };
    return this.http.post<any>(loginUrl, credentials, httpOptions);
  }

  modifyCompany(id_company:number, data:any){
    return this.http.put(`http://localhost:3000/modify_company/${id_company}`, data);
  }

  getCompany(id_company:number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/company/${id_company}`);
  }
}
