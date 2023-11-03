import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackDisplayComponent } from './feedback-display/feedback-display.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { HttpClientModule } from '@angular/common/http';
import { TrainerModule } from './trainer/trainer.module';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackDisplayComponent,
    UserListComponent,
    LoginComponent,
    ForgotPasswordComponent,
    FeedbackDetailsComponent,
    ThankYouComponent,
    AddQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TrainerModule
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
