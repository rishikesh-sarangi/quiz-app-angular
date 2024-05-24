import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { FormsModule } from '@angular/forms';
import { MultiUseDialogComponent } from 'src/app/Shared/multi-use-dialog/multi-use-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserExamComponent } from '../user-exam.component';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ExamResultService } from 'src/app/Shared/Services/exam-result.service';
@Component({
  selector: 'app-exam-tab-1',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './exam-tab-1.component.html',
  styleUrls: ['./exam-tab-1.component.scss'],
})
export class ExamTab1Component implements OnChanges, OnInit {
  @Input() questionArray: any[] = [];
  @Input() currentTabIndex: number = 0;

  @Output() nextTab = new EventEmitter<void>();
  @Output() isExamFinished = new EventEmitter<boolean>(false);

  userAnswers: string[] = [];

  bookmarkedQuestions: Set<number> = new Set();

  currentQuestion: number = 0;
  totalCorrect: number = 0;
  totalWrong: number = 0;
  totalUnattended: number = 0;
  totalQuestions!: number;

  selectedAnswer!: any;

  examID!: number;

  constructor(
    private examQuestionService: ExamQuestionsService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private examResultService: ExamResultService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.examID = parseInt(params['id']);
    });

    // console.log(this.examID);
  }

  ngOnChanges(): void {
    this.userAnswers = new Array(this.questionArray.length).fill(null);
    this.totalQuestions = this.questionArray.length;
    // console.log(this.examID);
  }

  onNextTab() {
    // console.log(this.currentTabIndex);
    const dialogRef = this.dialog.open(MultiUseDialogComponent, {
      data: {
        nextTabWarning:
          'Are you sure you want to go to next tab? You cannot visit previous tabs.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateResults();
        this.nextTab.emit();
      }
    });
  }

  selectQuestion(index: number) {
    this.selectedAnswer = null;
    this.currentQuestion = index;
  }

  toggleBookmark() {
    if (this.bookmarkedQuestions.has(this.currentQuestion)) {
      this.bookmarkedQuestions.delete(this.currentQuestion);
    } else {
      this.bookmarkedQuestions.add(this.currentQuestion);
    }
  }

  nextQuestion() {
    this.selectedAnswer = null;
    if (this.currentQuestion < this.totalQuestions - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion() {
    this.selectedAnswer = null;
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion--;
    }
    // console.log(this.currentQuestion);
  }

  onOptionChange(value: string) {
    this.userAnswers[this.currentQuestion] = value;
    // this.selectedAnswer = null;
  }

  isAnswered(index: number) {
    return this.userAnswers[index] !== null;
  }

  isBookmarked(index: number) {
    return this.bookmarkedQuestions.has(index);
  }

  onSubmit() {
    const dialogRef = this.dialog.open(MultiUseDialogComponent, {
      data: {
        submitWarning: 'Are you sure you want to submit?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateResults();
      }
    });
  }

  calculateResults() {
    for (let i = 0; i < this.totalQuestions; i++) {
      if (this.userAnswers[i] === this.questionArray[i].answer) {
        this.totalCorrect++;
      } else if (this.userAnswers[i] === null) {
        this.totalUnattended++;
      } else if (this.userAnswers[i] !== this.questionArray[i].answer) {
        this.totalWrong++;
      }
    }

    // console.log(this.userAnswers);
    // console.log('Total Correct:', this.totalCorrect);
    // console.log('Total Wrong:', this.totalWrong);
    // console.log('Total Unattended', this.totalUnattended);

    if (this.currentTabIndex === 0) {
      this.examResultService
        .updateExamResults(this.examID, {
          generalKnowledgeMarks: this.totalCorrect,
        })
        .subscribe((data) => {
          // console.log(data);
        });
    } else if (this.currentTabIndex === 1) {
      this.examResultService
        .updateExamResults(this.examID, {
          aptitudeMarks: this.totalCorrect,
        })
        .subscribe((data) => {
          // console.log(data);
        });
    } else {
      this.examResultService
        .updateExamResults(this.examID, {
          logicalReasoningMarks: this.totalCorrect,
        })
        .subscribe((data) => {
          // console.log(data);
          this.isExamFinished.emit(true);
        });
    }
  }
}
