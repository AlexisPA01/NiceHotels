import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Installation } from 'src/app/interfaces/installation.interface';

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private http: HttpClient) { }

  getRestaurantsForHotel(CodHotel: any) {
    return this.http.get<Installation>(`${apiUrl}/api/installation/${CodHotel}/1`);
  }

  getRoomServiceForHotel(idHotel: any) {
    return this.http.get<Installation>(`${apiUrl}/api/installation/room-service/${idHotel}`);
  }

  getOneInstallation(Id: any) {
    console.log(Id);
    
    return this.http.get<Installation>(`${apiUrl}/api/installation/${Id}`);
  }
}
