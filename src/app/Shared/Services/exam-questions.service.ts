import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamQuestionsService {
  endpoint1: string = 'http://localhost:3000/generalKnowledge';
  endpoint2: string = 'http://localhost:3000/aptitude';
  endpoint3: string = 'http://localhost:3000/logicalReasoning';

  constructor(private _http: HttpClient) {}

  getGeneralKnowledgeQuestions(): Observable<any> {
    return this._http.get<any[]>(this.endpoint1);
  }

  getAptitudeQuestions(): Observable<any> {
    return this._http.get<any[]>(this.endpoint2);
  }

  getLogicalReasoningQuestions(): Observable<any> {
    return this._http.get<any[]>(this.endpoint3);
  }

  addQuestion(questionType: any, data: any) {
    let apiUrl = '';

    switch (questionType) {
      case 0:
        apiUrl = `${this.endpoint1}`;
        break;
      case 1:
        apiUrl = `${this.endpoint2}`;
        break;
      case 2:
        apiUrl = `${this.endpoint3}`;
        break;
      default:
        console.error('Invalid questionType:', questionType);
        return;
    }

    return this._http.post(apiUrl, data);
  }
}
