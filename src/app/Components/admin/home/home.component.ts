import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamTypeService } from 'src/app/Shared/Services/exam-type.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todayDate!: Date;

  constructor(
    private examTypeService: ExamTypeService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.todayDate = new Date();
  }

  // true is type-1, false is type-2
  setExamType(type: boolean) {
    let payload: any = {};
    if (type) {
      payload = {
        date: this.todayDate,
        type: 1,
      };
    } else {
      payload = {
        date: this.todayDate,
        type: 2,
      };
    }

    // 1 is the definite ID for setting exams in database.
    this.examTypeService.updateExamType(1, payload).subscribe({
      next: (data) => {
        // console.log(data);
        this.openSnackBar(type);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openSnackBar(type: boolean) {
    this._snackbar.open(type ? 'Exam Type 1 Set' : 'Exam Type 2 Set', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
