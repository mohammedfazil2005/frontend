import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  
  otp:any
   timer:number=5
  btnBool:boolean=false

  constructor(private api:ApiService,private router:Router){
    this.onTimerCall()
  }

  onOTPsend(){
    if(!this.otp){
      return alert("Please enter otp!")
    }
    this.api.onOtp(this.otp).subscribe({
      next:(resp:any)=>{
        this.api.access_token=resp.token
        localStorage.setItem("user","user")
        this.router.navigateByUrl('/')
        alert(resp.message)
      },
      error:(reason:any)=>{
        alert(reason.error.message)
      }
    })
  }

  onTimerCall() {
  let interval = setInterval(() => {
    this.timer--;
    console.log(this.timer);
    if (this.timer === 0) { 
      this.btnBool = true;
      clearInterval(interval);
      this.timer=5
    }
  }, 1000);
}

onResendClick(){
  let email=sessionStorage.getItem("email")
  if(!email){
    this.router.navigateByUrl("/login")
  }
  let data={email:email}
  this.api.onLogin(data).subscribe({
    next:(resp:any)=>{
      this.btnBool=false
      this.onTimerCall()
      alert(resp.message)
    },
    error:(res:any)=>{
      alert(res.error.message)
    }
  })

}

}
