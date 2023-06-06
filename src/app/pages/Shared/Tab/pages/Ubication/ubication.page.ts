import { Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { RecommendedSites } from 'src/app/interfaces/recommendedSites.interface';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RecommendedSiteService } from 'src/app/services/recommendedSite/recommended-site.service';

@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.page.html',
  styleUrls: ['./ubication.page.scss'],
})
export class UbicationPage implements OnInit {
  constructor(private hotelSvc:HotelService,
    private recommededSvc:RecommendedSiteService) { }

  @ViewChild("Cont") Cont = HTMLElement
  map!:any;
  mapCatalonia!:any;
  mapTamaca!:any;

  Maps:any[] = [];

  Hotels!:Hotel[];
  Sites:RecommendedSites[] = []

  hotels2:any[] = [
    {
      tittle:"Hotel Cartagena Plaza",
      lat:10.402461410042378,
      lng:-75.55698388796071,
    },
    {
      tittle:"Catalonia Santo Domingo",
      lat: 18.458815471888155,
      lng: -69.91020517116445,
    },
    {
      tittle:"Hotel Tamacá Beach Resort",
      lat:11.200940055014314,
      lng:-74.22719627446185
    }
  ]

  test = {
    lat:14.597454541321111, 
    lng:-60.97734312687489
  }

  ngOnInit() {
    if (localStorage.getItem('status') !== null){
      //this.getHotelGuest();
    }else{
      this.loader();
      this.getHotels();
    }
  }

  ngAfterViewInit () {
  }

  markers(){
    setTimeout(async () => {
      this.Hotels.forEach( (x,ind) => {        
        let position = x.Ubication?.split(',');
        this.getRecommendedSites(x.Cod, this.Maps[ind]);
        const marker = new google.maps.Marker({
          position: {
            lat:position!.length === 2 ? parseFloat(position![0]) : this.test.lat,
            lng:position!.length === 2 ? parseFloat(position![1]) : this.test.lng
          }, 
          title: x.Name,
          map: this.Maps[ind]
        })
  
        let content = '<div class="info-title">'+x.Name+'</div>'
  
        let link = '<a href="https://www.google.com/maps/search/?api=1&query='+ parseFloat(x.Ubication!.split(',')[0])
        +'%2C'+parseFloat(x.Ubication!.split(',')[0])+'" target="_blank" class="info-text info-link"> Ver en Google Maps </a>'
  
        const InfoWindow = new google.maps.InfoWindow({
          content:content+link,
          ariaLabel:"test"
        })

        marker.addListener("click", () => {
          InfoWindow.open({
            anchor:marker,
            map:this.Maps[ind],
          })
        })
      })
    }, 2500);
  }

  getRecommendedSites(Cod:number, map:any){
    this.recommededSvc.getRecommendedSitesForHotel(Cod).subscribe({
      next: (res:any) => {
        if(res.data !== null){
          for (let x of res.data) {
            let position = x.Ubication?.split(',');
            const marker = new google.maps.Marker({
              position: {
                lat:position!.length === 2 ? parseFloat(position![0]) : this.test.lat,
                lng:position!.length === 2 ? parseFloat(position![1]) : this.test.lng
              }, 
              title: x.Name,
              map
            })
  
            let content = '<div class="info-title">'+x.Name+'</div>'
  
            let link = '<a href="https://www.google.com/maps/search/?api=1&query='+ parseFloat(x.Ubication!.split(',')[0])
            +'%2C'+parseFloat(x.Ubication!.split(',')[0])+'" target="_blank" class="info-text info-link"> Ver en Google Maps </a>'
  
            const InfoWindow = new google.maps.InfoWindow({
              content:content+link,
              ariaLabel:"test"
            })

            marker.addListener("click", () => {
              InfoWindow.open({
                anchor:marker,
                map
              })
            })
          }
        }
      },
      error: (err:any) => {

      }
    })
  }

  loader(){
    const loader = new Loader({
      apiKey: 'AIzaSyCd7qy6iqGYb6_y5RHdNZF87J7AyMerrTA',
      version: "weekly"
    })

    loader.load().then( () => {

    })
  }
  
  getHotels(){
    this.hotelSvc.getHotels().subscribe({
      next: (res:any) => {
        this.Hotels = res.data;       
        setTimeout(async () => {
          for (let i=0;i<this.Hotels.length;i++) {
            let position = this.Hotels[i].Ubication?.split(',');
            this.Maps.push(
              new google.maps.Map(document.getElementById("map"+i) as HTMLElement, {
                center: {
                  lat:position!.length === 2 ? parseFloat(position![0]): this.test.lat,
                  lng:position!.length === 2 ? parseFloat(position![1]) :this.test.lng
                },
                zoom: 15,
                mapTypeId: 'satellite'
              })
              
            )
          }
        }, 2500);
        this.markers();        
      },
      error: (err:any) => {

      }
    })
  }

}
