import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RecommendedSiteService } from 'src/app/services/recommendedSite/recommended-site.service';

@Component({
  selector: 'app-site-location',
  templateUrl: './site-location.page.html',
  styleUrls: ['./site-location.page.scss'],
})
export class SiteLocationPage implements OnInit {
  constructor(private router:Router,
    private hotelSvc:HotelService,
    private siteSvc:RecommendedSiteService) { }

  Logo:string = "";
  Hotel!:number;
  Address:string = "Cra. 1 #N° 6 - 154, Cartagena de Indias, Provincia de Cartagena, Bolívar";
  ImgSrc:string = "/assets/images/hotels/logo-cartagena-plaza1.png";
  map!:any;
  Position = {
    lat: 10.402461410042378,
    lng: -73.55698388796071,
  }
  Name:string = "";

  ngOnInit() {
    this.Hotel = parseInt(this.router.url.split('/').reverse()[0]);
    this.getHotel();
  }

  getHotel(){    
    this.hotelSvc.getHotel(this.Hotel).subscribe({
      next: (res:any) => {                                          
        if(res.data !== null){          
          if (res.data.Medias.length !== 0) {
            this.Logo = res.data.Medias[1].URL
          }
          this.Position = {
            lat:parseFloat(res.data.Ubication.split(',')[0]),
            lng:parseFloat(res.data.Ubication.split(',')[1])
          }

          this.loader();

          this.Name = res.data.Name;

          setTimeout(async () => {
            this.getMarker();
            this.getSite();
          },2500);
        }          
      },
      error: (err:any) => {

      }
    })
  }

  getSite(){
    this.siteSvc.getRecommendedSitesForHotel(this.Hotel).subscribe({
      next: (res:any) => {
        if(res.data !== null){          
          for (let x of res.data) {
            let position = x.Ubication?.split(',');
            if(position.length === 2){
              const marker = new google.maps.Marker({
                position: {
                  lat:parseFloat(position![0]),
                  lng:parseFloat(position![1])
                }, 
                title: x.Name,
                map:this.map
              })
                  
              let content = '<img width="200px" src="'+x.Medias[0].URL+'"alt="sitio">' +
              '<div class="info-title">'+x.Name+'</div>'+
              '<div class="info-text">'+x.Description+'</div>'+
              '<div class="info-text">'+x.Address+'</div>'              

              let link = '<a href="https://www.google.com/maps/search/?api=1&query='+ parseFloat(x.Ubication!.split(',')[0])
              +'%2C'+parseFloat(x.Ubication!.split(',')[1])+'" target="_blank" class="info-text info-link"> Ver en Google Maps </a>'
    
              const InfoWindow = new google.maps.InfoWindow({
                content:content,
                ariaLabel:"test"
              })
  
              marker.addListener("click", () => {
                InfoWindow.open({
                  anchor:marker,
                  map:this.map
                })
              })
            }
          }
        }      
      },
      error: (err:any) => {

      }
    })
  }

  getMarker(){
    setTimeout(async () => {
      const marker = new google.maps.Marker({
        position: this.Position, 
        title: "",
        map: this.map 
      })

      let content = '<div class="info-title">'+this.Name+'</div>'
      
      let link = '<a href="https://www.google.com/maps/search/?api=1&query='+ this.Position.lat
      +'%2C'+this.Position.lng+'" target="_blank" class="info-text info-link"> Ver en Google Maps </a>'

      const InfoWindow = new google.maps.InfoWindow({
        content:content+link,
        ariaLabel:"test"
      })
      marker.addListener("click", () => {
        InfoWindow.open({
          anchor:marker,
          map:this.map
        })
      })  
    }, 2500);
  }

  loader(){
    const loader = new Loader({
      apiKey: '',
      version: "weekly"
    })

    loader.load().then( () => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: this.Position,
          zoom: 14,
          mapTypeId: 'satellite'
        });
    })
  }

  goBack(){
    this.router.navigateByUrl('/hotels/hotel/recommended-site/'+this.Hotel)
  }
}
