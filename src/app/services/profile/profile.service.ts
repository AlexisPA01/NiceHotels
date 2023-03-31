import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../interfaces/hotel.interface';

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAccountGuest(Id: any) {
    return this.http.get(`${apiUrl}/api/account-guest/by-document/${Id}`);
  }

  updateAccountGuest(Id: any, body: any) {
    return this.http.put(`${apiUrl}/api/account-guest/${Id}`, body);
  }
}
