import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ExamQuestionsService } from 'src/app/Shared/Services/exam-questions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss'],
})
export class ExamQuestionsComponent implements OnInit {
  questionTypes: string[] = [
    'General Knowledge',
    'Aptitude',
    'Logical Reasoning',
  ];

  questionReactiveForm!: FormGroup;

  answerOptions = [
    {
      label: 'Option 1',
      value: 0,
    },
    {
      label: 'Option 2',
      value: 1,
    },
    {
      label: 'Option 3',
      value: 2,
    },
    {
      label: 'Option 4',
      value: 3,
    },
  ];

  constructor(
    private examQuestionService: ExamQuestionsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.questionReactiveForm = new FormGroup({
      questionType: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // console.log(this.questionReactiveForm.value);
    if (this.questionReactiveForm.valid) {
      const questionType = this.questionReactiveForm.get('questionType')?.value;
      let correctAnswer;
      if (this.questionReactiveForm.get('answer')?.value == 0) {
        correctAnswer = this.questionReactiveForm.get('option1')?.value;
      } else if (this.questionReactiveForm.get('answer')?.value == 1) {
        correctAnswer = this.questionReactiveForm.get('option2')?.value;
      } else if (this.questionReactiveForm.get('answer')?.value == 2) {
        correctAnswer = this.questionReactiveForm.get('option3')?.value;
      } else if (this.questionReactiveForm.get('answer')?.value == 3) {
        correctAnswer = this.questionReactiveForm.get('option4')?.value;
      }
      // console.log(questionType);
      const data = {
        question: this.questionReactiveForm.get('question')?.value,
        option1: this.questionReactiveForm.get('option1')?.value,
        option2: this.questionReactiveForm.get('option2')?.value,
        option3: this.questionReactiveForm.get('option3')?.value,
        option4: this.questionReactiveForm.get('option4')?.value,
        answer: correctAnswer,
      };

      console.log(data);
      this.examQuestionService.addQuestion(questionType, data)?.subscribe({
        next: (data) => {
          // console.log(data);
          this.questionReactiveForm.reset();
          this.openSnackBar();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  openSnackBar() {
    this._snackBar.open('Question Added', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
