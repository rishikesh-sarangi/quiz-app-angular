import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/Shared/login/login.component';
import { HeaderComponent } from './Components/admin/header/header.component';
import { HomeComponent } from './Components/admin/home/home.component';
import { authGuardAdmin, authGuardUser } from './guard.guard';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { UserHeaderComponent } from './Components/user/user-header/user-header.component';
import { UserHomeComponent } from './Components/user/user-home/user-home.component';
import { UserExamComponent } from './Components/user/user-exam/user-exam.component';
import { UserExamType2Component } from './Components/user/user-exam-type-2/user-exam-type-2.component';
import { ExamQuestionsComponent } from './Components/admin/exam-questions/exam-questions.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: HeaderComponent,
    canActivate: [authGuardAdmin],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'exam-question',
        component: ExamQuestionsComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserHeaderComponent,
    canActivate: [authGuardUser],
    children: [
      {
        path: 'home',
        component: UserHomeComponent,
      },
      {
        path: 'exam/examType2/:id',
        component: UserExamType2Component,
      },
      {
        path: 'exam/examType1/:id',
        component: UserExamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
