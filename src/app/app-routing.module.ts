import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

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
    path:'feedback',
    component:FeedbackFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
