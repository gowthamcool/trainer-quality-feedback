import { Component, OnInit } from '@angular/core';
import * as e from 'express';
import { ApiService } from '../api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  question:string = '';
  isMandatory:boolean = false;
  isRating:boolean = false;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  switchValMandatory(ele:HTMLInputElement){
    if(ele.value == 'on'){
      this.isMandatory = true;
    }
    else{
      this.isMandatory = false;
    }
  }
  switchValRating(ele:HTMLInputElement){
    if(ele.value == 'on'){
      this.isRating = true;
    }
    else{
      this.isRating = false;
    }
  }
  addQuestion(){
    this.api.postQuestions({
    question: this.question,
    isRating:this.isRating,
    required:this.isMandatory
    }).subscribe((res:any)=>{
      if(res.status == 'success'){
        this.router.navigate(['/thankYou'])
      }

    })
  }
  logout(){
    this.api.logout();
  }
}
