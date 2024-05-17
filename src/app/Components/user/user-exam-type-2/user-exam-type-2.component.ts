import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { MatDialog } from '@angular/material/dialog';
import { MultiUseDialogComponent } from 'src/app/Shared/multi-use-dialog/multi-use-dialog.component';
@Component({
  selector: 'app-user-exam-type-2',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './user-exam-type-2.component.html',
  styleUrls: ['./user-exam-type-2.component.scss'],
})
export class UserExamType2Component implements OnInit {
  questionArray: any = [];
  examReactiveForm!: FormGroup;

  userAnswers: string[] = new Array(this.questionArray.length).fill(null);

  totalCorrect: number = 0;
  totalWrong: number = 0;
  totalUnattended: number = 0;
  totalQuestions!: number;
  isExamFinished: boolean = false;

  constructor(
    private examQuestionService: ExamQuestionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQuestions();
    // console.log(this.questionArray);

    // console.log(this.userAnswers);
    this.examReactiveForm = new FormGroup({
      selectedAnswer: new FormControl(null, [Validators.required]),
    });
  }

  getQuestions() {
    this.examQuestionService.getGeneralKnowledgeQuestions().subscribe({
      next: (data) => {
        for (const obj of data) {
          this.questionArray.push(obj);
        }
        this.userAnswers = new Array(data.length).fill(null);
        this.totalQuestions = data.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const dialogRef = this.dialog.open(MultiUseDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateResults();
        this.isExamFinished = true;
      }
    });
  }

  answerSubmited(correctAnswer: string, index: number) {
    const selectedAnswer = this.examReactiveForm.get('selectedAnswer')?.value;
    this.userAnswers[index] = selectedAnswer;
  }

  calculateResults() {
    for (let i = 0; i < this.questionArray.length; i++) {
      if (this.userAnswers[i] === this.questionArray[i].answer) {
        this.totalCorrect++;
      } else if (this.userAnswers[i] === null) {
        this.totalUnattended++;
      } else if (this.userAnswers[i] !== this.questionArray[i].answer) {
        this.totalWrong++;
      }
    }
    console.log('Total Correct:', this.totalCorrect);
    console.log('Total Wrong:', this.totalWrong);
    console.log('Total Unattended', this.totalUnattended);
  }
}
