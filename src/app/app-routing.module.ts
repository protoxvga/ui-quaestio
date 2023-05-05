import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateQuestionComponent } from "./create-question/create-question.component";
import { QuestionPageComponent } from "./question-page/question-page.component";
import { AnsweredPageComponent } from "./answered-page/answered-page.component";
import { AllQuestionsPageComponent } from "./all-questions-page/all-questions-page.component";
import { SearchResultComponent } from "./search-result/search-result.component";

const routes: Routes = [
  { path: "", redirectTo:"home", pathMatch:"full" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'createQuestion', component: CreateQuestionComponent },
  { path: 'question/:id', component: QuestionPageComponent },
  { path: 'answered', component: AnsweredPageComponent },
  { path: 'questions', component: AllQuestionsPageComponent },
  { path: 'searchResult/:type/:term', component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
