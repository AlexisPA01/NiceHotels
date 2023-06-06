import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getRecommendedSitesForHotel(object: any) {
    return this.http.post<any>(`${apiUrl}/api/reservation`, object);
  }

  getRecommendedStie(Id:string){
    return this.http.get<any>(`${apiUrl}/api/reservation`);
  }
}
