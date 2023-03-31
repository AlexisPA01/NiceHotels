import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class AccountService implements CanActivate {
  constructor(private http: HttpClient,
    private router:Router) { }

  canActivate(){
    if (localStorage.getItem('status') !== null){
      this.router.navigate(['/'])
      return false
    }else{
      return true
    }
  }

  logInGuest(user:object){
    return this.http.post(`${apiUrl}/api/account-guest/login`,user);
  }

  getGuest(doc:number){
    return this.http.get(`${apiUrl}/api/account-guest/by-document/${doc}`)
  }
}
