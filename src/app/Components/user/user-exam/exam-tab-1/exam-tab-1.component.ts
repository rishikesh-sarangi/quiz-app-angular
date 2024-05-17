import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { FormsModule } from '@angular/forms';
import { MultiUseDialogComponent } from 'src/app/Shared/multi-use-dialog/multi-use-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-exam-tab-1',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './exam-tab-1.component.html',
  styleUrls: ['./exam-tab-1.component.scss'],
})
export class ExamTab1Component implements OnInit, OnChanges {
  @Input() questionArray: any[] = [];

  userAnswers: string[] = [];

  bookmarkedQuestions: Set<number> = new Set();

  currentQuestion: number = 0;
  totalCorrect: number = 0;
  totalWrong: number = 0;
  totalUnattended: number = 0;
  totalQuestions!: number;
  isExamFinished: boolean = false;

  selectedAnswer!: any;

  constructor(
    private examQuestionService: ExamQuestionsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questionArray.length = 0;
    this.userAnswers.length = 0;
    this.bookmarkedQuestions.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newQuestionArray = changes['questionArray'].currentValue;
    this.userAnswers = new Array(newQuestionArray.length).fill(null);
    this.totalQuestions = newQuestionArray.length;
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
    const dialogRef = this.dialog.open(MultiUseDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateResults();
        this.isExamFinished = true;
      }
    });
  }

  calculateResults() {
    this.isExamFinished = true;
    for (let i = 0; i < this.totalQuestions; i++) {
      if (this.userAnswers[i] === this.questionArray[i].answer) {
        this.totalCorrect++;
      } else if (this.userAnswers[i] === null) {
        this.totalUnattended++;
      } else if (this.userAnswers[i] !== this.questionArray[i].answer) {
        this.totalWrong++;
      }
    }

    console.log(this.userAnswers);
    console.log('Total Correct:', this.totalCorrect);
    console.log('Total Wrong:', this.totalWrong);
    console.log('Total Unattended', this.totalUnattended);
  }
}
