import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const ApiURI = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class InstallationMediaService {

  constructor(
    private http: HttpClient
    ) { }
  
    getInstallationMediaByInstallation(Id: any) {
      return this.http.get(`${ApiURI}/api/installation-media/by-id-installation/${Id}`);
    }
}
