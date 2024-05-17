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

  onSubmit() {
    if (this.userReactiveForm.valid) {
      this.examTypeService.getExamType().subscribe({
        next: (data) => {
          const payload = {
            date: data[0].date,
            examType: data[0].type,
            ...this.userReactiveForm.value,
          };

          this.examResultService.addExamResults(payload).subscribe({
            next: (data) => {
              // console.log(data.examType);
              this.router.navigate([
                'user',
                'exam',
                data.examType === 2 ? 'examType2' : 'examType1',
                `examID=${data.id}`,
              ]);
            },
            error: (err) => {
              console.log(err);
            },
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
