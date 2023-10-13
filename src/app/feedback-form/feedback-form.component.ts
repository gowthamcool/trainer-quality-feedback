import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  questions:any = [ ];
  answers:any = [];
  staff:any = [];
  courses =  [];
  total =0;
  day = '';
  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.api.getCourses().subscribe((res:any)=>{
      this.courses = res;
    });
    this.api.getTrainers().subscribe((res:any)=>{
      this.staff = res;
    })
    this.api.getQuestions().subscribe((res:any)=>{
      this.questions=res.data.questions;
    },(err)=>{console.log(err);
    },()=>{
      this.questions.map((question:any)=>{
        question.answer = '';
        question.score = 0;
      })
    });
    console.log(JSON.stringify(this.questions));

  }
  calculateTotal(){
    this.questions.forEach((question:any)=>{this.total+=question.score});
  }
  showDay(date:string){
    const dayno = new Date(date).getDay();
    const days = ["Sunday","Monday","Tuesday","Wednesday","thursday","Friday","Saturday"];
    this.day = days[dayno];
  }
  submitFeedback(){
    console.log(JSON.stringify(this.questions))
    this.questions.forEach((question:any)=>{
      this.answers.push({question:question.question,score:question.score})
    })
  }
}
