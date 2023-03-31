import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../interfaces/hotel.interface';

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  postLogin(body: any) {
    return this.http.post(`${apiUrl}/api/account-guest/login`, body);
  }
}
