import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { MultiUseDialogComponent } from 'src/app/Shared/multi-use-dialog/multi-use-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ExamTab1Component } from './exam-tab-1/exam-tab-1.component';
import { MatTabGroup } from '@angular/material/tabs';
import { DialogRef } from '@angular/cdk/dialog';
import { ExamResultService } from 'src/app/Shared/Services/exam-result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-exam',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ExamTab1Component],
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.scss'],
})
export class UserExamComponent implements OnInit {
  constructor(
    private examQuestionService: ExamQuestionsService,
    private dialog: MatDialog,
    private examResultService: ExamResultService,
    private activatedRoute: ActivatedRoute
  ) {}

  questionArray: any = [];
  currentTabIndex: any = 0;
  generalKnowledgeQuestions: any[] = [];
  aptitudeQuestions: any[] = [];
  logicalReasoningQuestions: any[] = [];
  examID!: number;

  isExamFinished: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.examID = parseInt(params['id']);
    });

    // console.log('gettting the id' + this.examID);
    this.examQuestionService.getGeneralKnowledgeQuestions().subscribe({
      next: (data) => {
        this.generalKnowledgeQuestions = data;
      },
    });
  }

  disabledTabs = [false, true, true]; // Initially disable all tabs except the first one
  onTabChange(event: any) {
    // console.log('changing');
    // event.preventDefault();
    this.currentTabIndex = event.index;
    switch (this.currentTabIndex) {
      case 0:
        this.examQuestionService.getGeneralKnowledgeQuestions().subscribe({
          next: (data) => {
            this.generalKnowledgeQuestions = data;
          },
        });
        break;
      case 1:
        this.examQuestionService.getAptitudeQuestions().subscribe({
          next: (data) => {
            this.aptitudeQuestions = data;
            this.disabledTabs[0] = true;
            this.disabledTabs[1] = false;
          },
        });
        break;
      case 2:
        this.examQuestionService.getLogicalReasoningQuestions().subscribe({
          next: (data) => {
            this.logicalReasoningQuestions = data;
            this.disabledTabs[0] = true;
            this.disabledTabs[1] = true;
            this.disabledTabs[2] = false;
          },
        });
        break;
    }
  }

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  switchToNextTab() {
    this.currentTabIndex = this.tabGroup.selectedIndex;
    if (
      this.currentTabIndex !== null &&
      this.currentTabIndex !== undefined &&
      this.currentTabIndex < this.tabGroup._tabs.length - 1
    ) {
      this.tabGroup.selectedIndex = this.currentTabIndex + 1;
    }
  }

  generalKnowledgeMarks: number = 0;
  aptitudeMarks: number = 0;
  logicalReasoningMarks: number = 0;

  getScores(finished: boolean) {
    this.isExamFinished = finished;
    this.examResultService.getExamResultsByID(this.examID).subscribe({
      next: (data) => {
        this.generalKnowledgeMarks = data.generalKnowledgeMarks;
        this.aptitudeMarks = data.aptitudeMarks;
        this.logicalReasoningMarks = data.logicalReasoningMarks;
      },
    });
  }
}
