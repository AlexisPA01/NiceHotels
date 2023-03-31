import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { AccountService } from 'src/app/services/account/account.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {
  Hotels:Hotel[] = []

  HotelsImgs:string[][] = []

  Banner:string = "/assets/images/hotels/defaultBanner.png"
  Logo:string = "/assets/images/hotels/logo-cartagena-plaza1.png"

  constructor(private hotelsSvc:HotelService,
    private accountSvc:AccountService,
    private router:Router) { }

  ngOnInit() {
    this.getHotelGuest();

    if (localStorage.getItem('status') !== null){
      this.getHotelGuest();
    }else{
      this.getHotels();
    }
  }

  getHotels(){
    this.hotelsSvc.getHotels().subscribe({
      next: (res:any) => {
        this.Hotels = res.data
      },
      error: (err:any) => {

      }
    })
  }

  getHotelGuest(){
    this.accountSvc.getGuest(1007008009).subscribe({
      next: (res:any) => {
        console.log(res)
      },
      error: (err:any) => {
        console.log(err)
      }
    })
  }

  goHotel(Cod:number){
    this.router.navigateByUrl('hotels/hotel/'+Cod)
  }

}
