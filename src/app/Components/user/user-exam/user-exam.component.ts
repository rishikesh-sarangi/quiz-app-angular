import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { MultiUseDialogComponent } from 'src/app/Shared/multi-use-dialog/multi-use-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ExamTab1Component } from './exam-tab-1/exam-tab-1.component';

@Component({
  selector: 'app-user-exam',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ExamTab1Component],
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.scss'],
})
export class UserExamComponent implements OnInit {
  constructor(private examQuestionService: ExamQuestionsService) {}

  questionArray: any = [];

  generalKnowledgeQuestions: any[] = [];
  aptitudeQuestions: any[] = [];
  logicalReasoningQuestions: any[] = [];

  totalCorrect: number = 0;
  totalWrong: number = 0;
  totalUnattended: number = 0;
  totalQuestions!: number;
  isExamFinished: boolean = false;

  ngOnInit(): void {
    this.getExamQuestion(0);
    this.getExamQuestion(1);
    this.getExamQuestion(2);
  }

  getExamQuestion(currentTab: number) {
    if (currentTab === 0) {
      this.examQuestionService.getGeneralKnowledgeQuestions().subscribe({
        next: (data) => {
          this.generalKnowledgeQuestions = data;
        },
      });
    } else if (currentTab === 1) {
      this.examQuestionService.getAptitudeQuestions().subscribe({
        next: (data) => {
          this.aptitudeQuestions = data;
        },
      });
    } else if (currentTab === 2) {
      this.examQuestionService.getLogicalReasoningQuestions().subscribe({
        next: (data) => {
          this.logicalReasoningQuestions = data;
        },
      });
    }
  }
}
