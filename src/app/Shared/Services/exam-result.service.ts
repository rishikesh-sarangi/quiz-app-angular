import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamResultService {
  endpoint: string = 'http://localhost:3000/examResults';

  constructor(private _http: HttpClient) {}

  addExamResults(data: any): Observable<any> {
    return this._http.post(this.endpoint, data);
  }
}
