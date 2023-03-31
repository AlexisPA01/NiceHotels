import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [DatePipe],
})
export class LoginPage implements OnInit {
  NumDocument: string;
  NumRoom: number;

  BirthDay: string =
    this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZ') || '';

  constructor(
    private loginSvc: LoginService,
    private datePipe: DatePipe,
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    toggleDarkTheme(prefersDark.matches);
    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) =>
      toggleDarkTheme(mediaQuery.matches)
    );

    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd: any) {
      document.body.classList.toggle('light', shouldAdd);
    }
  }

  // ? Alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Datos Incorrectos',
      message: 'Por Favor Confirma Que Tus Datos Sean Correctos!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // ? Loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000,
    });
    await loading.present();
  }

  onLogin() {
    const body = {
      Document: this.NumDocument,
      Num: this.NumRoom,
      DateBirth: this.BirthDay,
    };

    this.loginSvc.postLogin(body).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data.data.token));
          localStorage.setItem('Document', JSON.stringify(data.data.Document));
          localStorage.setItem('NumRoom', JSON.stringify(data.data.Num));
          this.router.navigate(['/']);
        } else {
          console.log('hubo error');
          this.presentAlert();
        }
      },
    });

    // console.log(body);
  }
}
