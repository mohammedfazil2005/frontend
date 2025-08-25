import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string=""
  bool:boolean=false
 
  
  constructor(private api:ApiService,private router:Router){}

  onLoginClick(){
    if(!this.email){
      return alert("Enter email!")
    }
   

    let data={email:this.email}
    this.bool=true

    console.log(data)

    this.api.onLogin(data).subscribe({
      next:(resp:any)=>{
        sessionStorage.setItem("email",data.email)
        alert(resp.message)
        this.bool=false   
        this.router.navigateByUrl('/otp')
      },
      error:(error:any)=>{
        this.bool=false
        console.log(error)
        alert(error.error.message)
      }
    })




  }




}
