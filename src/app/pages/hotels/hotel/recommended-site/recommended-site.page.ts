import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendedSites } from 'src/app/interfaces/recommendedSites.interface';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RecommendedSiteService } from 'src/app/services/recommendedSite/recommended-site.service';

@Component({
  selector: 'app-recommended-site',
  templateUrl: './recommended-site.page.html',
  styleUrls: ['./recommended-site.page.scss'],
})
export class RecommendedSitePage implements OnInit {
  constructor(private router:Router,
    private hotelSvc:HotelService,
    private siteSvc:RecommendedSiteService) { }
  
  Logo:string = "";
  Hotel!:number;
  Carousel:string[] = [];
  Sites:RecommendedSites[] = [];

  Site1:RecommendedSites={
    CodHotel: 0,
    Name: '',
    Description: '',
    Address: '',
    IdCity: 0,
    Ubication:'',
    Medias: ''
  };

  Site2:RecommendedSites={
    CodHotel: 0,
    Name: '',
    Description: '',
    Address: '',
    IdCity: 0,
    Ubication:'',
    Medias: ''
  };

  ngOnInit() {
    this.Hotel = parseInt(this.router.url.split('/').reverse()[0]);
    this.getHotel();
    this.getSite();
  }

  getHotel(){    
    this.hotelSvc.getHotel(this.Hotel).subscribe({
      next: (res:any) => {                                          
        if(res.data !== null){          
          if (res.data.Medias.length !== 0) {
            this.Logo = res.data.Medias[1].URL
          }
        }          
      },
      error: (err:any) => {

      }
    })
  }

  getSite(){
    this.siteSvc.getRecommendedSitesForHotel(this.Hotel).subscribe({
      next: (res:any) => {
        this.Site1 = res.data[0];
        this.Site2 = res.data[1];
        this.Carousel = res.data.map( (x:any) => {return x.Medias[0].URL})
        console.log(this.Carousel);
        
      },
      error: (err:any) => {
        console.log(err);
        
      }
    })
  }

  goLocation(){
    this.router.navigateByUrl('/hotels/hotel/site-location/'+this.Hotel)
  }

  goBack(){
    this.router.navigateByUrl('/hotels/hotel/'+this.Hotel)
  }
}
