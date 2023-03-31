import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { InstallationService } from 'src/app/services/installation/installation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  Logo:string = "";
  Hotel:string = "";
  Restaurant:string = "";
  //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc:string = "";
  constructor(private router:Router,
    private hotelSvc:HotelService,
    private installSvc:InstallationService) { }

  ngOnInit() {
    this.Hotel = this.router.url.split('/').reverse()[2];
    this.Restaurant = this.router.url.split('/').reverse()[1];
    this.getHotel();
    this.getInstallation();
  }

  getHotel(){    
    this.hotelSvc.getHotel(parseInt(this.Hotel)).subscribe({
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

  getInstallation(){
    this.installSvc.getOneInstallation(this.Restaurant).subscribe(
      {next: (res:any) => {      
        if(res.data.Medias.length !== 0){                 
          this.pdfSrc = res.data.Medias.find( (x:any) => x.Name.split('.')[1] === "pdf" ).URL;
        }        
      },
      error: (err) => {
        
      }
    })
  }

  goBack(){
    this.router.navigateByUrl('/hotels/hotel/restaurant/'+this.Hotel+'/'+this.Restaurant)
  }

}
