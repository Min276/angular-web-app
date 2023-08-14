import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormContactsService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:3000/form_contacts`

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
 }

 postData(data: any): Observable<any> {
  return this.http.post(`${this.baseURL}`, data)
}
}
