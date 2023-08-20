import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor(private http: HttpClient) { }
  private baseURL = `https://fakestoreapi.com/products`

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
 }

 getLimitData(quantity: number): Observable<any> {
  return this.http.get(`${this.baseURL}?limit=${quantity}`)
}

getDataById(id:number): Observable<any> {
  return this.http.get(`${this.baseURL}/${id}`)
}

}
