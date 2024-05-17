import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamType2Component } from './user-exam-type-2.component';

describe('UserExamType2Component', () => {
  let component: UserExamType2Component;
  let fixture: ComponentFixture<UserExamType2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserExamType2Component]
    });
    fixture = TestBed.createComponent(UserExamType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
