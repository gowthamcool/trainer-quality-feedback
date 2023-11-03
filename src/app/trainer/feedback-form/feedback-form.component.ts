import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit,DoCheck {
  questions:any = [ ];
  answers:any = {};
  total =0;
  trainerName:string | null='';
  date:string='';
  day = '';
  evaluatorName: string | null = '';
  course: string = '';
  topic: string = '';
  isError = false;
  employees:string[] = [];

  //dummy data..... Delet later on
  courses=[];
  constructor(private api:ApiService, private router:Router) {}
  ngDoCheck(): void {
    this.trainerName = this.employees[1];
    this.course =this.courses[0];
  }

  ngOnInit(): void {
    this.api.getCourses().subscribe((res:any)=>{
      this.courses = res.data.courseNames;
    });
    this.employees = this.api.getTrainernames();
    this.evaluatorName = localStorage.getItem('userName');
    this.api.getQuestions().subscribe((res:any)=>{
      this.questions=res.data.question;
    },(err)=>{console.log(err);
    },()=>{
      this.questions.map((question:any)=>{
        question.answer = '';
        question.score = 0;
      })
    });
    this.api.getTrainerFeedback().subscribe((res)=>{
      console.log(JSON.stringify(res));

    })
    console.log(JSON.stringify(this.questions));

  }
  updateScore(activeQuestion:any){
    if(activeQuestion.score > 0){
      this.questions.map((question:any) => {
        if (question.question === activeQuestion.question) {
            return { ...question, score: activeQuestion.score };
        }
        return question;
    });
    this.total = 0;
    this.calculateTotal();
    }
  }
  calculateTotal(){
    this.questions.forEach((question:any)=>{this.total+=question.score});
  }
  showDay(date:string){
    this.date = date;
    const dayno = new Date(date).getDay();
    const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    this.day = days[dayno];
  }
  submitFeedback(){
    this.answers=this.getBasicDetails();
    this.answers.questions =[];
    this.questions.forEach((question:any)=>{
      this.answers.questions.push({question:question.question,score:question.score,answer:question.answer});
    });
    this.answers.totalScore = this.total;
    this.answers.isSelfReviewed = false;
    this.api.postAnswers(this.answers).subscribe((res:any)=>{
      if(res.status === "success"){
        this.answers= {};
        this.total= 0;
        this.router.navigate(['/thankYou']);
      }
      else{
        this.isError = true;
      }
    },(err)=>{
      console.log(err);
      this.isError = true;

    });

  }
  getBasicDetails(){
    return {
      trainerName: this.trainerName,
      evaluatorName: this.evaluatorName,
      course: this.course,
      topic: this.topic,
      date: this.date,
      day:this.day
    }
  }
  logout(){
    this.api.logout();
  }
}
