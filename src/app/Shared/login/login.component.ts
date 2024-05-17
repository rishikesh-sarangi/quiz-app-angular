import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}
  hide = true;

  // reactive forms
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  protected openSnackBar() {
    this.snackBar.open('Login Invalid', 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  protected onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.getUsers().subscribe({
        next: (users) => {
          for (const obj of users) {
            if (
              obj.email == this.loginForm.value.email &&
              obj.password == this.loginForm.value.password
            ) {
              // console.log('YES WELCOME');
              if (obj.isAdmin) {
                localStorage.setItem('loggedInSaveAdmin', 'true');
                this.router.navigate(['admin', 'home']);
              } else {
                localStorage.setItem('loggedInSaveUser', 'true');
                this.router.navigate(['user', 'home']);
              }
              break;
            } else {
              // this.openSnackBar();
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
