import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {apiUrls} from 'src/enums/api.enum'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public getQuestions(){
    return this.http.get(this.baseUrl+apiUrls.GetQuestions);
  }
  public getTrainers(){
    return this.http.get('http://localhost:3000/staff');
  }
  public getCourses(){
    return this.http.get('http://localhost:3000/courses');
  }
  public postLogin(credentials:any){
    return this.http.post(credentials,'http://localhost:3000/users');
  }
}
