import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { HomeComponent } from './home/home.component';
import { TrainerRoutingModule } from './trainer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [FeedbackFormComponent, HomeComponent, DashboardComponent,HeaderComponent],
  imports: [
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TrainerModule { }
