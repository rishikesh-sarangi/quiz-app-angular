import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExamTypeService } from 'src/app/Shared/Services/exam-type.service';
import { ExamResultService } from 'src/app/Shared/Services/exam-result.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  todayDate!: Date;
  userReactiveForm!: FormGroup;

  constructor(
    private _snackbar: MatSnackBar,
    private examTypeService: ExamTypeService,
    private examResultService: ExamResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todayDate = new Date();
    this.userReactiveForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      emailID: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  private checkUserExists(payload: any): Observable<boolean> {
    return this.examResultService.getExamResults().pipe(
      map((results: any) => {
        return results.some(
          (obj: any) =>
            obj.date === payload.date &&
            obj.userName === payload.userName &&
            obj.emailID === payload.emailID &&
            obj.examType === payload.examType
        );
      })
    );
  }

  private updateExamResult(payload: any) {
    this.examResultService.getExamResults().subscribe({
      next: (data) => {
        for (const obj of data) {
          if (
            obj.date === payload.date &&
            obj.userName === payload.userName &&
            obj.emailID === payload.emailID
          ) {
            this.examResultService
              .updateExamResults(obj.id, payload)
              .subscribe({
                next: (data) => {
                  this.router.navigate([
                    'user',
                    'exam',
                    data.examType === 2 ? 'examType2' : 'examType1',
                    `${data.id}`,
                  ]);
                },
                error: (err) => {
                  console.log(err);
                },
              });
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private createExamResult(payload: any) {
    this.examResultService.addExamResults(payload).subscribe({
      next: (data) => {
        this.router.navigate([
          'user',
          'exam',
          data.examType === 2 ? 'examType2' : 'examType1',
          `${data.id}`,
        ]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.userReactiveForm.valid) {
      this.examTypeService.getExamType().subscribe({
        next: (data) => {
          const payload = {
            date: data[0].date,
            examType: data[0].type,
            ...this.userReactiveForm.value,
          };

          this.checkUserExists(payload).subscribe((exists: any) => {
            if (exists) {
              // Update existing exam result
              this.updateExamResult(payload);
            } else {
              // Create new exam result
              this.createExamResult(payload);
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openSnackBar(type: boolean) {
    this._snackbar.open(type ? 'Exam Type 1 Set' : 'Exam Type 2 Set', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
