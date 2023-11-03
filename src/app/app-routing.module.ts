import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FeedbackDisplayComponent } from './feedback-display/feedback-display.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'passwordReset',
    component:ForgotPasswordComponent
  },
  {
    path:'dashboard',
    component:FeedbackDisplayComponent
  },
  {
    path: 'feedbackDetails',
    component:FeedbackDetailsComponent
  },
  {
    path: 'trainer',
    loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule)
  },
  {
    path: 'thankYou',
    component:ThankYouComponent
  },
  {
    path: 'addQuestion',
    component:AddQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
