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
import { ExamResultService } from 'src/app/Shared/Services/exam-result.service';
import { ActivatedRoute } from '@angular/router';
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
  examID!: number;
  constructor(
    private examQuestionService: ExamQuestionsService,
    public dialog: MatDialog,
    private examResultService: ExamResultService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.examID = parseInt(params['id']);
    });

    this.getQuestions();
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

        this.examQuestionService.getAptitudeQuestions().subscribe({
          next: (data) => {
            for (const obj of data) {
              this.questionArray.push(obj);
            }

            this.examQuestionService.getLogicalReasoningQuestions().subscribe({
              next: (data) => {
                for (const obj of data) {
                  this.questionArray.push(obj);
                }
                this.userAnswers = new Array(this.questionArray.length).fill(
                  null
                );
                this.totalQuestions = this.questionArray.length;
              },
            });
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const dialogRef = this.dialog.open(MultiUseDialogComponent, {
      data: {
        examType2Submit: 'Are you sure you want to submit ?',
      },
    });
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
    // console.log(this.userAnswers);
    for (let i = 0; i < this.questionArray.length; i++) {
      if (this.userAnswers[i] === this.questionArray[i].answer) {
        this.totalCorrect++;
      } else if (this.userAnswers[i] === null) {
        this.totalUnattended++;
      } else if (this.userAnswers[i] !== this.questionArray[i].answer) {
        this.totalWrong++;
      }
    }

    this.examResultService
      .updateExamResults(this.examID, {
        totalMarks: this.totalCorrect,
      })
      .subscribe();
  }
}
