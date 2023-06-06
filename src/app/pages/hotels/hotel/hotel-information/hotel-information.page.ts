import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from "@googlemaps/js-api-loader";
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-hotel-information',
  templateUrl: './hotel-information.page.html',
  styleUrls: ['./hotel-information.page.scss'],
})
export class HotelInformationPage implements OnInit {
  map!:any;

  Logo:string = ""

  Description:string = "El Hotel Cartagena Plaza, miembro de la cadena Hotelera EM HOTELS " +
  "inició operaciones en el año de 1993. El Hotel cuenta con 310 " + 
  "confortables habitaciones estándar, una Suite y una Junior Suite " +
  "con la mejor vista al mar y a la ciudad antigua, un panorama "+
  "espectacular que lo envuelve en la magia del caribe."

  Address:string = "Cra. 1 #N° 6 - 154, Cartagena de Indias, Provincia de Cartagena, Bolívar"

  Hotel:string = "Hotel Cartagena Plaza"

  Document:string = "La familia Cartagena Plaza siempre ha estado " +
  "comprometida con su salud y bienestar. Comprendemos "+
  "el impacto que ha generado la gran cantidad de "+
  "información, las restricciones de viajes y la "+
  "cancelación de eventos públicos a nivel "+
  "mundial, debido a la situación generada por "+
  "el COVID-19 (coronavirus)."

  Link:string = ""

  Phones:string[] = [
    "Principal (57-5) 651 7450"
  ]

  Position = {
    lat: 10.402461410042378,
    lng: -75.55698388796071,
  }

  constructor(private router:Router,
    private hotelSvc:HotelService) { }

  ngOnInit() {
    this.getHotel();
  }  

  ngAfterViewInit () {
    
  }

  loader(){
    const loader = new Loader({
      apiKey:'AIzaSyCd7qy6iqGYb6_y5RHdNZF87J7AyMerrTA',
      version: "weekly"
    })

    loader.load().then( () => {
      this.map = new google.maps.Map(document.getElementById("map-cartagena") as HTMLElement, {
        center: this.Position,
        zoom: 15,
        mapTypeId: 'satellite'
      });
    })
  }

  getMarker(){
    setTimeout(async () => {
      const marker = new google.maps.Marker({
        position: this.Position, 
        title: "",
        map: this.map 
      })

      let content = '<div class="info-title">'+this.Hotel+'</div>'

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

  getHotel(){
    let Cod = parseInt(this.router.url.split('/').reverse()[0])
    
    this.hotelSvc.getHotel(Cod).subscribe({
      next: (res:any) => {
        if(res.data !== null){
          this.Description = res.data.Description;
          this.Hotel = res.data.Name;
          this.Address = res.data.Address;
          this.Position = {
            lat:parseFloat(res.data.Ubication.split(',')[0]),
            lng:parseFloat(res.data.Ubication.split(',')[1])
          }         
          if(res.data !== null){          
            if (res.data.Medias.length !== 0) {
              this.Logo = res.data.Medias[1].URL
            }
          }    
        }
        
        setTimeout(async () => {
          this.loader();
        },2500);

        setTimeout(async () => {
          this.getMarker();
        },2500);
        
      },
      error: (err:any) => {

      }
    })
  }

  goBack(){
    let hotel = this.router.url.split('/').reverse()[0]    
    this.router.navigateByUrl('/hotels/hotel/'+hotel)
  }
}
