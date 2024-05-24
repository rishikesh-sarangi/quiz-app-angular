import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExamResultService } from 'src/app/Shared/Services/exam-result.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  constructor(private getExamResultsService: ExamResultService) {}

  types: string[] = ['Exam Type 1', 'Exam Type 2'];
  selectedType: string = 'Exam Type 1';

  displayedColumns: string[] = [];

  dataSourceType1!: MatTableDataSource<any>;
  dataSourceType2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getResults();
    this.selectedType = 'Exam Type 1';
    this.displayedColumns = [
      'userName',
      'emailID',
      'date',
      'generalKnowledgeMarks',
      'aptitudeMarks',
      'logicalReasoningMarks',
    ];
  }

  changeType(event: any) {
    // console.log(event.value);
    if (event.value === 'Exam Type 1') {
      this.selectedType = 'Exam Type 1';
      this.displayedColumns = [
        'userName',
        'emailID',
        'date',
        'generalKnowledgeMarks',
        'aptitudeMarks',
        'logicalReasoningMarks',
      ];
    } else if (event.value === 'Exam Type 2') {
      this.selectedType = 'Exam Type 2';
      this.displayedColumns = ['userName', 'emailID', 'date', 'totalMarks'];
    }
  }

  getResults() {
    this.getExamResultsService.getExamResults().subscribe({
      next: (data) => {
        // console.log(data);

        const type1Payload = data.filter((obj: any) => obj.examType === 1);
        this.dataSourceType1 = new MatTableDataSource(type1Payload);
        this.dataSourceType1.paginator = this.paginator;
        this.dataSourceType1.sort = this.sort;

        const type2Paylod = data.filter((obj: any) => obj.examType === 2);
        this.dataSourceType2 = new MatTableDataSource(type2Paylod);
        this.dataSourceType2.paginator = this.paginator;
        this.dataSourceType2.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
