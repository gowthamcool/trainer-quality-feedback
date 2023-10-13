import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName:['',Validators.required],
    password:['',Validators.required]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.api.postLogin(this.loginForm.value).subscribe((res:any)=>{
      if(res.status>400){
        this.router.navigate(['/errorpage']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
