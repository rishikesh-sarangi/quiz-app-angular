import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamQuestionsService {
  endpoint: string = 'http://localhost:3000/examQuestions';

  constructor(private _http: HttpClient) {}

  getGeneralKnowledgeQuestions(): Observable<any> {
    return this._http
      .get<any[]>(this.endpoint)
      .pipe(map((data) => data[0]?.generalKnowledge));
  }

  getAptitudeQuestions(): Observable<any> {
    return this._http
      .get<any[]>(this.endpoint)
      .pipe(map((data) => data[1]?.aptitude));
  }

  getLogicalReasoningQuestions(): Observable<any> {
    return this._http
      .get<any[]>(this.endpoint)
      .pipe(map((data) => data[2]?.logicalReasoning));
  }
}
