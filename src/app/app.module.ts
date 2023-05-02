import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterPageComponent,
    MatchPasswordDirective,
    LoginPageComponent,
    CreateQuestionComponent,
    QuestionPageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
