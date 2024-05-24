import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamResultService {
  endpoint: string = 'http://localhost:3000/examResults';

  constructor(private _http: HttpClient) {}

  addExamResults(data: any): Observable<any> {
    return this._http.post(this.endpoint, data);
  }

  updateExamResults(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.endpoint}/${id}`, data);
  }

  getExamResults(): Observable<any> {
    return this._http.get(this.endpoint);
  }

  getExamResultsByID(id: number): Observable<any> {
    return this._http.get(`${this.endpoint}/${id}`);
  }
}
