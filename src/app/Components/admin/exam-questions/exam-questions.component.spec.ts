import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuestionsComponent } from './exam-questions.component';

describe('ExamQuestionsComponent', () => {
  let component: ExamQuestionsComponent;
  let fixture: ComponentFixture<ExamQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExamQuestionsComponent]
    });
    fixture = TestBed.createComponent(ExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
