import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-display',
  templateUrl: './feedback-display.component.html',
  styleUrls: ['./feedback-display.component.scss']
})
export class FeedbackDisplayComponent implements OnInit {

  heading:string = '';
  feedbacks:any =[ ];
  needReviewCounter =0;
  isTrainer:boolean = false;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    let role = localStorage.getItem('role');
    this.isTrainer = role == 'trainer';
    this.heading = role=='admin'?"Trainer's Quality Assessment Feedback":"My Feedbacks";
    if(role == 'admin'){
      this.api.getFeedback().subscribe((res:any)=>{
        this.feedbacks = res.data.answer;
      });
    }
    else{
      let feedbackResponse=(res:any)=>{
        this.feedbacks = res.data.answer;
      }
      let feedbackError = (err:any)=>{console.log(err);}
      let retriveFeedback = ()=>{
        this.feedbacks.forEach((feedback:any)=>{
          if(feedback.accomplished || feedback.hudle || feedback.improvement){
            feedback.needReview = false;
          }else{
            feedback.needReview = true;
            this.needReviewCounter++;
          }
        })
      }
      this.api.getTrainerFeedback().subscribe({next:feedbackResponse,error:feedbackError,complete:retriveFeedback});
    }
  }
  viewDetails(feedback:any){
    localStorage.setItem('currentFeedback',JSON.stringify(feedback));
    this.router.navigateByUrl('/feedbackDetails',{state:feedback});
  }
  openFeedback(){
    this.router.navigate(['/trainer']);
  }
  logout(){
    this.api.logout();
  }
  addQuestion(){
    this.router.navigate(['/addQuestion']);
  }
}
