import { Injectable } from '@angular/core';
import { Room } from 'src/app/interfaces/room.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { RoomNumber } from 'src/app/interfaces/roomNumber.interface';
import { RoomEquipment } from 'src/app/interfaces/roomEquipment.interface';

const apiUrl = environment.API_URI;
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomsForHotel(CodHotel: any) {
    return this.http.get<Room>(`${apiUrl}/api/room/hotel-room/${CodHotel}`);
  }

  getOneRoom(Cod: any) {
    return this.http.get<Room>(`${apiUrl}/api/room/${Cod}`);
  }

  getRoomNumbersByRoom(Cod: any) {
    return this.http.get<RoomNumber>(`${apiUrl}/api/room-number/by-room/${Cod}`);
  }

  getRoomEquipmentsByRoom(Cod: any) {
    return this.http.get<RoomEquipment>(`${apiUrl}/api/room-equipment/by-room/${Cod}`);
  }

  getEquipments() {
    return this.http.get(`${apiUrl}/api/equipment/`);
  }
}
