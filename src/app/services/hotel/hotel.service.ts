import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../interfaces/hotel.interface'

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  getHotels() {
    return this.http.get<Hotel>(`${apiUrl}/api/hotel/`);
  }

  getHotel(Cod: number) {
    return this.http.get<Hotel>(`${apiUrl}/api/hotel/hotel/${Cod}`);
  }
}
