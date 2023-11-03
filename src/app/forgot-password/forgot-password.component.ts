import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email:string ='';
  otp:number = 0;
  newOtp:number = 0;
  isInvalidOTP = false;
  password  ='';
  token = '';
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  sendEmail(){
    this.api.forgotPassword({email:this.email}).subscribe((res:any)=>{
      this.otp = res.otp;
      this.token = res.token
    });
  }
  validateOTP(){
    if(this.otp == this.newOtp) {
      this.isInvalidOTP = false;
    }
    else{
      this.isInvalidOTP = true;
    }
  }
  resetPassword(){
    this.api.resetPassword({password:this.password},this.token).subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      localStorage.setItem('role',res.data.user.role);
      localStorage.setItem("userName",res.data.user.employeeName);
      this.router.navigate(['/dashboard'])
    });
  }
}
