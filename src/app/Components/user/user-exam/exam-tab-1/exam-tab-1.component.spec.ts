import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTab1Component } from './exam-tab-1.component';

describe('ExamTab1Component', () => {
  let component: ExamTab1Component;
  let fixture: ComponentFixture<ExamTab1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExamTab1Component]
    });
    fixture = TestBed.createComponent(ExamTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
