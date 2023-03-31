import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Installation } from 'src/app/interfaces/installation.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { InstallationService } from 'src/app/services/installation/installation.service';
import { RoomService } from 'src/app/services/room/room.service';
import SwiperCore, { Pagination, SwiperOptions, Autoplay, Scrollbar, EffectFade, Keyboard, Navigation, A11y } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Autoplay, Navigation,Pagination, EffectFade, Scrollbar, Keyboard, A11y])
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class HotelPage implements OnInit {
  constructor(private router:Router,
    private roomSvc:RoomService,
    private installationSvc:InstallationService,
    private hotelSvc:HotelService) 
  { }

  Cod!:number;

  Installations:Installation[] = [];

  Rooms:Room[] = [];

  LogoSrc:string = "/assets/images/hotels/logo-cartagena-plaza1.png"
  HotelSrc:string = "/assets/images/hotels/hotel-1-cartagena-plaza1.png"

  Hotel:string = "1"
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  CheckRestaurant:boolean = true;
  CheckRoom:boolean = true;
  CheckLogo:boolean = true;

  Logo:string = "/assets/images/cartagena/logo-cartagena-plaza2.png"

  Link:string = '/hotels/hotel/hotel-information/1'

  Slider:any[] = [
    "/assets/images/cartagena/hotel-cartagena-plaza1.png",
    "/assets/images/cartagena/hotel-cartagena-plaza2.png",
    "/assets/images/cartagena/hotel-cartagena-plaza3.png",
    "/assets/images/cartagena/hotel-cartagena-plaza4.png",
    "/assets/images/cartagena/hotel-cartagena-plaza5.png",
    "/assets/images/cartagena/hotel-cartagena-plaza6.png"
  ]

  SliderDefault:any[] = [
    "/assets/images/cartagena/hotel-cartagena-plaza1.png",
    "/assets/images/cartagena/hotel-cartagena-plaza2.png",
    "/assets/images/cartagena/hotel-cartagena-plaza3.png",
    "/assets/images/cartagena/hotel-cartagena-plaza4.png",
    "/assets/images/cartagena/hotel-cartagena-plaza5.png",
    "/assets/images/cartagena/hotel-cartagena-plaza6.png"
  ]

  Rooms1:any[] = [
    {
      id:1,
      img:"/assets/images/cartagena/room/Hab-1-1.png",
      title:"Habitación de Prueba 1",
      price:"$737.100"
    },
    {
      id:2,
      img:"/assets/images/cartagena/room/Hab-2-1.png",
      title:"Music de Prueba 2",
      price:"$737.100"
    },
    {
      id:3,
      img:"/assets/images/cartagena/room/Hab-3-1.png",
      title:"Habitación de Prueba 3",
      price:"$764.100"
    },
    {
      id:4,
      img:"/assets/images/cartagena/room/Hab-4-1.png",
      title:"Habitación de Prueba 4",
      price:"$764.100"
    },
  ]

  Restaurants:any[] = [
    {
      id:1,
      img:"/assets/images/cartagena/restaurant/Res-1-1.png",
      title:"Restaurante de Prueba 1",
      text:"La cultura caribeña y mediterránea"
    },
    {
      id:2,
      img:"/assets/images/cartagena/restaurant/Res-2-1.png",
      title:"Restaurante de Prueba 2",
      text:"Deleite su paladar con la mejor comida"
    },
    {
      id:3,
      img:"/assets/images/cartagena/restaurant/Res-3-1.png",
      title:"Restaurante de Prueba 3",
      text:"Propuesta gastronómica del Gran Caribe"
    },
  ]

  Services:any[] = [
    {
      title:"Spa",
      img:"/assets/images/cartagena/spa.png",
    },
    {
      title:"Piscina",
      img:"/assets/images/cartagena/piscina.png",
    },
    {
      title:"Eventos",
      img:"/assets/images/cartagena/eventos.png",
    },
    {
      title:"Lugares de interes",
      img:"/assets/images/cartagena/lugares-de-interes.png",
    },
  ]

  config:SwiperOptions = {
    slidesPerView: 1,
    loop:true,
    autoplay: true,
     scrollbar:{
        el: '.swiper-scrollbar',
        draggable: true,
      }
  }

  config2 = {
    slidesPerView: 1,
    loop: true,
    speed:200,
    pagination: {clickable: true},
    autoplay: true,
    scrollbar: true
  }

  type:string = 'rooms';

  ngOnInit() {
    this.Cod = parseInt(this.router.url.split('/').reverse()[0]);
    this.getHotel();
    this.getRooms();
    this.getInstallations();
    if(this.router.url === '/hotels/hotel/1'){
      this.LogoSrc = "/assets/images/hotels/logo-catalonia-santodomingo.png"
      this.HotelSrc = "/assets/images/hotels/hotel-2-catalonia-santodomingo.png"
      this.Slider = ['/assets/images/catalonia/hotelcatalonia1.png',
      '/assets/images/catalonia/hotelcatalonia2.png',
      '/assets/images/catalonia/hotelcatalonia3.png',
      '/assets/images/catalonia/hotelcatalonia4.png',
      '/assets/images/catalonia/hotelcatalonia5.png',
      '/assets/images/catalonia/hotelcatalonia6.png']
      this.Restaurants = [
        {
          id:1,
          img:"/assets/images/catalonia/restaurant/Res-1-1.png",
          title:"Restaurante Filigrana",
          text:"Ofrece una magnifica vista al mar"
        },
        {
          id:2,
          img:"/assets/images/catalonia/restaurant/Res-2-1.png",
          title:"Restaurante Sea Blue",
          text:"Completo desayuno buffet con gran variedad de productos"
        }
      ]
      this.Rooms1 = [
        {
          id:1,
          img:"/assets/images/catalonia/room/Hab-1-1.png",
          title:"Ocean Front",
          price:"$696.000"
        },
        {
          id:2,
          img:"/assets/images/catalonia/room/Hab-2-1.png",
          title:"Ocean View",
          price:"$640.000"
        },
      ]
      this.Services = [
        {
          title:"Eventos",
          img:"/assets/images/catalonia/service/eventos.png",
        },
        {
          title:"Gimnasio",
          img:"/assets/images/catalonia/service/Gimnasio.png",
        },
        {
          title:"Piscina",
          img:"/assets/images/catalonia/service/piscina.png",
        },
        {
          title:"Spa",
          img:"/assets/images/catalonia/service/spa.png",
        },
        {
          title:"Lugares de interes",
          img:"/assets/images/cartagena/lugares-de-interes.png",
        },
      ]
      this.Link = '/hotels/hotel/hotel-information/2'
      this.Logo = "/assets/images/catalonia/logo-catalonia.png"
      this.Hotel = "2"
    }else if(this.router.url === '/hotels/hotel/4'){
      this.LogoSrc = "/assets/images/hotels/logo-tamaca.png"
      this.HotelSrc = "/assets/images/hotels/hotel-3-tamaca.png"
      this.Slider = ['/assets/images/tamaca/hoteltamaca1.png',
      '/assets/images/tamaca/hoteltamaca2.png',
      '/assets/images/tamaca/hoteltamaca3.png',
      '/assets/images/tamaca/hoteltamaca4.png',
      '/assets/images/tamaca/hoteltamaca5.png',
      '/assets/images/tamaca/hoteltamaca6.png',]
      this.Restaurants = [
        {
          id:1,
          img:"/assets/images/tamaca/restaurant/Res-1-1.png",
          title:"Restaurante",
          text:"Un espacio apacible donde te serviremos platos exquisitos para que comas como un rey"
        },
      ]
      this.Rooms1 = [
        {
          id:1,
          img:"/assets/images/tamaca/room/Hab-1-1.png",
          title:"Habitación Superior 1 Cama",
          price:"$488.000"
        },
        {
          id:2,
          img:"/assets/images/tamaca/room/Hab-2-1.png",
          title:"Habitación Superior 2 Camas",
          price:"$488.000"
        },
      ]
      this.Services = [
        {
          title:"Parqueadero",
          img:"/assets/images/tamaca/service/parqueadero.png",
        },
        {
          title:"Piscina",
          img:"/assets/images/tamaca/service/piscina.png",
        },
        {
          title:"Lugares de interes",
          img:"/assets/images/cartagena/lugares-de-interes.png",
        },
      ]
      this.Link = '/hotels/hotel/hotel-information/3'
      this.Logo = "/assets/images/hotels/logo-tamaca.png"
      this.Hotel="3"
    }
  }

  onSwiper([swiper]:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  goRecommendedSite(){
    this.router.navigateByUrl("/hotels/hotel/recommended-site/"+this.Cod)
  }

  goInformationHotel(){
    this.router.navigateByUrl("/hotels/hotel/hotel-information/"+this.Cod)
  }

  goRestaurant(res:string|number){  
    res = res.toString();  
    
    this.router.navigateByUrl('/hotels/hotel/restaurant/'+this.Cod+'/'+res)
  }

  goRoom(room:string|number){
    room = room.toString();
    
    this.router.navigateByUrl('/hotels/hotel/room/'+this.Cod.toString()+'/'+room)
  }

  getHotel(){    
    this.hotelSvc.getHotel(this.Cod).subscribe({
      next: (res:any) => {                          
        if(res.data !== null){          
          if (res.data.Medias.length !== 0) {
            this.Slider = res.data.Medias
            this.Logo = res.data.Medias[1].URL
            this.Slider.shift()
            this.Slider.shift()
            this.Slider = this.Slider.map(x  => {
              return x.URL
            })
          }else{
            this.CheckLogo = false;
            this.Slider = []
          } 
        }          
      },
      error: (err:any) => {

      }
    })
  }

  getRooms(){
    this.roomSvc.getRoomsForHotel(this.Cod).subscribe({
      next: (res:any) => { 
        if(res.data === null || res.data.length === 0){
          this.CheckRoom = false;
        }else{
          this.Rooms = res.data;

          for (const i of this.Rooms) {       
            let aux = [{URL:'/assets/images/cartagena/room/Hab-3-1.png'}]
            if(i.Medias.length === 0){
              i.Medias = aux
            }
          }
        }
      },
      error: (err:any) => {

      }
    })
  }

  getInstallations(){
    this.installationSvc.getRestaurantsForHotel(this.Cod).subscribe({
      next: (res:any) => {
       console.log(res);
        
        if(res.data === null || res.data.length === 0){          
          this.CheckRestaurant = false;
        }else{
          for (const i of res.data) {
            let aux = [{URL:'/assets/images/cartagena/restaurant/Res-2-1.png'}]
            if(i.Medias.length === 0){
              i.Medias = aux
            }else{
              i.Medias = i.Medias.filter( (x:any) => x.Name.split('.')[1] !== "pdf" );
            }
            this.Installations.push(i)
          }
                  
          for (const i of this.Installations) {       
            let aux = [{URL:'/assets/images/cartagena/restaurant/Res-2-1.png'}]
            if(i.Medias.length === 0){
              i.Medias = aux
            }
          }
        }        
        // if(this.Installations.length === 0){
        //   let ins = {
        //     Id: 1,
        //     CodHotel: 3,
        //     IdInstallationType: 1,
        //     Name: "Restaurante de Prueba",
        //     Description: "Un espacio apacible donde te serviremos platos exquisitos para que comas como un rey",
        //     Schedule: "",
        //     DressCode: ""
        //   }
        //   this.Installations.push(ins)
        // }
      },
      error: (err:any) => {

      }
    })
  }

}
