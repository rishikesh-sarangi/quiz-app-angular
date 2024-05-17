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
@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss'],
})
export class ExamQuestionsComponent implements OnInit {
  questionReactiveForm!: FormGroup;

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
  onSubmit() {}
}
