import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/interfaces/room.interface';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  Logo:string = ""

  Room:Room = {
    Cod: 0,
    CodHotel:0,
    Name: "",
    Description: "",
    CostNight: 0,
    Medias:0
  };

  Rooms:any[] = [];
  Id:number = 0;
  IdHotel:number = 0;

  Slider:string[] = []

  constructor(private router:Router,
    private roomSvc:RoomService,
    private hotelSvc:HotelService) 
    { }

  ngOnInit() {
    this.IdHotel = parseInt(this.router.url.split('/').reverse()[1]);
    this.Id = parseInt(this.router.url.split('/').reverse()[0]);
    this.getRoom();
    this.getHotel();
    // switch (hotel) {
    //   case '1':
    //     this.Rooms= [
    //       {
    //         id:1,
    //         img:"/assets/images/cartagena/room/Hab-1-1.png",
    //         title:"Habitación Estandar",
    //         price:"$737.100"
    //       },
    //       {
    //         id:2,
    //         img:"/assets/images/cartagena/room/Hab-2-1.png",
    //         title:"Music Room",
    //         price:"$737.100"
    //       },
    //       {
    //         id:3,
    //         img:"/assets/images/cartagena/room/Hab-3-1.png",
    //         title:"Habitación con vistas a la ciudad",
    //         price:"$764.100"
    //       },
    //       {
    //         id:4,
    //         img:"/assets/images/cartagena/room/Hab-4-1.png",
    //         title:"Habitación con vistas al mar",
    //         price:"$764.100"
    //       },
    //     ]
    //     break;
    //   case '3':
    //     this.Rooms = [
    //       {
    //         id:1,
    //         img:"/assets/images/tamaca/room/Hab-1-1.png",
    //         title:"Habitación Superior 1 Cama",
    //         price:"$488.000"
    //       },
    //       {
    //         id:2,
    //         img:"/assets/images/tamaca/room/Hab-2-1.png",
    //         title:"Habitación Superior 2 Camas",
    //         price:"$488.000"
    //       },
    //     ]
    //   break;
    //   case '2':
    //     this.Rooms = [
    //       {
    //         id:1,
    //         img:"/assets/images/catalonia/room/Hab-1-1.png",
    //         title:"Ocean Front",
    //         price:"$696.000"
    //       },
    //       {
    //         id:2,
    //         img:"/assets/images/catalonia/room/Hab-2-1.png",
    //         title:"Ocean View",
    //         price:"$640.000"
    //       },
    //     ]
    //   break;
    // }

    // switch (hotel) {
    //   case '1':
    //     hotel = "cartagena"
    //   break;
    //   case '2':
    //     hotel = "catalonia"
    //     this.Logo = "/assets/images/catalonia/logo-catalonia.png";

    //   break;
    //   case '3':
    //     hotel = "tamaca"
    //     this.Logo = "/assets/images/hotels/logo-tamaca.png";

    //   break;
    // }

    // let room = this.Rooms[this.Id].img.split('/').reverse()[0].split('-')[1];

    // this.Slider = [
    //   '/assets/images/'+hotel+'/room/Hab-'+room+'-1.png',
    //   '/assets/images/'+hotel+'/room/Hab-'+room+'-2.png',
    //   '/assets/images/'+hotel+'/room/Hab-'+room+'-3.png'
    // ]
  }

  getRoom(){
    this.roomSvc.getOneRoom(this.Id).subscribe({
      next: (res:any) => {        
        this.Room = res.data
        if(res.data.Medias.length !== 0){
          this.Slider = res.data.Medias.map( (x:any) => {
            return x.URL
          })
        }else{
          this.Slider.push("/assets/images/tamaca/room/Hab-1-1.png")
          this.Slider.push("/assets/images/tamaca/room/Hab-1-2.png")
          this.Slider.push("/assets/images/tamaca/room/Hab-1-3.png")
        }
      },
      error: (err:any) => {

      }
    })
  }

  getHotel(){    
    this.hotelSvc.getHotel(this.IdHotel).subscribe({
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

  goBack(){
    let hotel = this.router.url.split('/').reverse()[1]
    this.router.navigateByUrl('/hotels/hotel/'+hotel)
  }

}
