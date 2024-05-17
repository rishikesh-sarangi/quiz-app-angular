import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamTypeService {
  endpoint = 'http://localhost:3000/examType';

  constructor(private _http: HttpClient) {}

  updateExamType(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.endpoint}/${id}`, data);
  }

  getExamType(): Observable<any> {
    return this._http.get(this.endpoint);
  }
}
