import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
    this.registerForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }

  onBtnClick(){
    if(!this.registerForm.valid){
      return alert("Please check the form!")
    }

    this.api.onRegister(this.registerForm.value).subscribe({
      next:(resp:any)=>{
        alert(resp.message)
        this.router.navigateByUrl("/login")
      },
      error:(reason:any)=>{
        console.log(reason)
        alert(reason.error.message)
      }
    })

  }

}
