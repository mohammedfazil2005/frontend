import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit(){
    this.onFetchUserDetails()
  }

  constructor(private api:ApiService){}

  onFetchUserDetails(){
    this.api.onGetUsers().subscribe({
      next:(resp)=>{
        console.log(resp)
      }
    })
  }

  

}
