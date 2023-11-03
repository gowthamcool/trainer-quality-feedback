import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss']
})
export class FeedbackDetailsComponent implements OnInit {

  isError = false;
  details:any = {};
  day:string = '';
  accomplished:string = '';
  hudle:string = '';
  improvement:string = '';
  isTrainer = false;
  isAnswered = false;
  constructor(private location:Location, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    let feedback:any = this.location.getState();
    let currentFeedback:any = localStorage.getItem('currentFeedback');
    this.details= feedback.Date?feedback: JSON.parse(currentFeedback);
    this.showDay(this.details.Date);
    this.isAnswered= (this.details.accomplished!== undefined&&this.details.accomplished!== '') || (this.details.hudle !== undefined && this.details.hudle !== '') || (this.details.improvement !== undefined && this.details.improvement !== '');
    if(this.isAnswered){
      this.accomplished = this.details.accomplished;
      this.hudle = this.details.hudle;
      this.improvement = this.details.improvement;
    }
    this.isTrainer = localStorage.getItem('role')=='trainer';
    if(this.isTrainer)localStorage.setItem('answerId',this.details._id);
  }
  showDay(date:string){
    const dayno = new Date(date).getDay();
    const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    this.day = days[dayno];
  }
  completeFeedback(){
    this.api.updateAnswers({accomplished:this.accomplished,
    hudle:this.hudle,
    improvement:this.improvement}).subscribe((res:any)=>{
      if(res.status == 'success'){
        this.router.navigate(['/thankYou']);
      }
    })
  }
  logout(){
    this.api.logout();
  }
}
