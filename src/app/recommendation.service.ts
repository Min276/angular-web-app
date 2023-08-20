import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:3000/recommendations`

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
 }

 postData(data: any): Observable<any> {
  return this.http.post(`${this.baseURL}`, data)
}

// updateData(data: any, id: number): Observable<any> {
//   return this.http.patch(`${this.baseURL}/${id}`, data);
// }

// deleteData(id: number): Observable<any> {
//   return this.http.delete(`${this.baseURL}/${id}`);
// }
}
