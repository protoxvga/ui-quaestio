import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateQuestionComponent } from "./create-question/create-question.component";
import { QuestionPageComponent } from "./question-page/question-page.component";

const routes: Routes = [
  { path: "", redirectTo:"register", pathMatch:"full" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'createQuestion', component: CreateQuestionComponent },
  { path: 'question/:id', component: QuestionPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
