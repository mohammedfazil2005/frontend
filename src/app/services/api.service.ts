import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  access_token:string=""

  constructor(private http:HttpClient) { }


  onLogin(body:any){
    return this.http.post('/login',body)
  }

  onRegister(body:any){
    return this.http.post('/reg',body)
  }

  onOtp(id:any){
    return this.http.post(`/verification/${id}`,{})
  }
  onGetUsers(){
    return this.http.get('/getuser')
  }
  onRefreshToken(){
    return this.http.post('/refresh',{})
  }



}
