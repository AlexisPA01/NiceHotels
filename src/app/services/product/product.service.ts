import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Installation } from 'src/app/interfaces/installation.interface';
import { environment } from 'src/environments/environment';

const apiUrl = environment.API_URI;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private router:Router, private http:HttpClient) { }

  getProductsForInstallation(id: any) {
    return this.http.get<Installation>(`${apiUrl}/api/product/by-installation/${id}`);
  }

  getRoomServicesProducts(idInstallation: any) {
    return this.http.get(`${apiUrl}/api/product/room-service/${idInstallation}`);
  }
}
