import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {apiUrls} from 'src/enums/api.enum'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private router:Router) { }

  public getQuestions(){
    return this.http.get(this.baseUrl+apiUrls.Questions);
  }
  public getTrainers():Observable<any>{
    return this.http.get(this.baseUrl+apiUrls.Users);
  }
  public getTrainernames(){
    let trainernames:string[] = [];
    this.getTrainers().subscribe((res:any)=>{
      let trainers = res.data.user;
      trainers.forEach((trainer:any)=>{
        if(trainer.role == 'trainer')
          trainernames.push(trainer.employeeName);
      })
   });
   return trainernames;
  }
  public getCourses(){
    return this.http.get(this.baseUrl+apiUrls.Courses+"/coursenames");
  }
  public getFeedback(){
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });

        const httpOptions = {
          headers: headers_object
        };

    return this.http.get(this.baseUrl+apiUrls.Answers,httpOptions);
  }

  public getTrainerFeedback(){
    return this.http.get(this.baseUrl+apiUrls.Answers+"?trainerName="+localStorage.getItem('userName'));
  }
  public postLogin(credentials:any){
    return this.http.post(credentials,'http://localhost:3000/users');
  }
  public postAnswers(answers:object){
    return this.http.post(this.baseUrl+apiUrls.Answers,answers);
  }
  public updateAnswers(updateVal:any){
    return this.http.patch(this.baseUrl+apiUrls.Answers+'/'+localStorage.getItem('answerId'),updateVal);
  }
  public loginUser(user:object){
    return this.http.post(this.baseUrl+apiUrls.Users+'/login',user);
  }
  public postQuestions(question:object){
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.http.post(this.baseUrl+apiUrls.Questions,question,httpOptions);
  }
  public forgotPassword(email:any){
   return this.http.post(this.baseUrl+apiUrls.Users+'/forgotPassword',email);
  }
  public resetPassword(password:any,token:string){
    return this.http.patch(this.baseUrl+apiUrls.Users+'/resetPassword/'+token,password);
  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
