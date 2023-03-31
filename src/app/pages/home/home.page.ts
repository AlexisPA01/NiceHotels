import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

import SwiperCore from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hotels: Hotel[] = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 3,
  };

  constructor(
    private hotelSvc: HotelService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //this.getHotels();
    this.isLoggedIn();
  }

  prueba = true;

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  getHotels() {
    this.hotelSvc.getHotels().subscribe({
      next: (res: any) => {
        this.hotels = res.data;
        console.log(this.hotels);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // ? para olvidar token
  logout() {
    localStorage.removeItem('token');
    // this.router.navigate(['/auth/login']);
  }

  // swiper = new Swiper('.swiper', {
  //   // Optional parameters
  //   direction: 'vertical',
  //   loop: true,

  //   // If we need pagination
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },

  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },

  //   // And if we need scrollbar
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //   },
  // });
}
