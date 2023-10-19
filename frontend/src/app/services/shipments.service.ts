import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  constructor(private http: HttpClient) { }

  shipments(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/shipments');
  }

  addShipment(postal_code:number, addressee:string, sender:string, weight:number): Observable<any> {
    const registrarUrl = 'http://localhost:3000/add_shipment';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = {
      postal_code:postal_code, 
      addressee:addressee, 
      sender:sender, 
      weight:weight
    };
    return this.http.post<any>(registrarUrl, credentials, httpOptions);
  }

  deleteShipment(id_shipment: number): Observable<any> {
    const deleteUrl = `http://localhost:3000/delete_shipment/${id_shipment}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(deleteUrl, httpOptions);
  }

  getCompanyByPostalCode(postalCode: number): Observable<any> {
    return this.http.get(`http://localhost:3000/get_company_by_postal_code/${postalCode}`);
  }
}
