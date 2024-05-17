import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamComponent } from './user-exam.component';

describe('UserExamComponent', () => {
  let component: UserExamComponent;
  let fixture: ComponentFixture<UserExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserExamComponent]
    });
    fixture = TestBed.createComponent(UserExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
