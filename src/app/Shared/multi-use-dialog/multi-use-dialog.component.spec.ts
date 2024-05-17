import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUseDialogComponent } from './multi-use-dialog.component';

describe('MultiUseDialogComponent', () => {
  let component: MultiUseDialogComponent;
  let fixture: ComponentFixture<MultiUseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultiUseDialogComponent]
    });
    fixture = TestBed.createComponent(MultiUseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
