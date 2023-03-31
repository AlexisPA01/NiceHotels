import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { RecommendedSites } from 'src/app/interfaces/recommendedSites.interface';

const apiUrl = environment.API_URI;

@Injectable({
  providedIn: 'root'
})
export class RecommendedSiteService {

  constructor(private http: HttpClient) { }

  getRecommendedSitesForHotel(codHotel: any) {
    return this.http.get<RecommendedSites>(`${apiUrl}/api/recommended-site/by-cod-hotel/${codHotel}`);
  }

  getRecommendedStie(Id:string){
    return this.http.get<RecommendedSites>(`${apiUrl}/api/recommended-site/${Id}`);
  }
}
