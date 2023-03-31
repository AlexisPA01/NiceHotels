import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Installation } from 'src/app/interfaces/installation.interface';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { InstallationService } from 'src/app/services/installation/installation.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  Logo: string = '';

  constructor(private InstallSvc:InstallationService,
    private router:Router,
    private hotelSvc:HotelService,
    private productSvc:ProductService) { }

    Installations:any[] = [];
    Id:number = 0;

    Breakfast:any[] = [];
    Lunch:any[] = [];

  Installation: Installation = {
    Id: 0,
    CodHotel: 0,
    IdInstallationType: 0,
    Name: '',
    Description: '',
    Schedule: '',
    DressCode: '',
    Medias: '',
  };

    Slider:string[] = []
    
    ngOnInit() {
      this.Id = parseInt(this.router.url.split('/').reverse()[0])
      
      this.getInstallation();
      this.getHotel();
      this.getProducts();
    }

  getInstallation(){
    this.InstallSvc.getOneInstallation(this.Id).subscribe(
      {next: (res:any) => {                
        if(res.data.Medias.length !== 0){              
          this.Installation = res.data
          this.Installation.Medias = res.data.Medias.filter( (x:any) => x.Name === "main" || x.Name === "carousel");
          this.Slider = res.data.Medias.map( (x:any) => {  
            return x.URL
          })
        }else{
          this.Slider.push("/assets/images/tamaca/restaurant/Res-1-1.png")
          this.Slider.push("/assets/images/tamaca/restaurant/Res-1-2.png")
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getHotel() {
    let hotel = parseInt(this.router.url.split('/').reverse()[1]);

    this.hotelSvc.getHotel(hotel).subscribe({
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

  getProducts(){
    this.productSvc.getProductsForInstallation(this.Id).subscribe({
      next: (res:any) => {        
        for (const i of res.data) {
          if(i.IdProductCategory === 1){
            this.Breakfast.push(i);
          }else if(i.IdProductCategory === 2){
            this.Lunch.push(i);
          }
        }
      },
      error: (err:any) => {

      }
    })
  }

  goBack() {
    let hotel = this.router.url.split('/').reverse()[1];
    this.router.navigateByUrl('/hotels/hotel/' + hotel);
  }

  goMenu(){
    let hotel = this.router.url.split('/').reverse()[1]
    this.router.navigateByUrl('/hotels/hotel/restaurant/'+hotel+'/'+this.Id+'/menu')
  }

}
