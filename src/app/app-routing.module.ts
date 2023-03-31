import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/Auth/Login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ubication',
    loadChildren: () => import('./pages/Shared/Tab/pages/Ubication/ubication.module').then( m => m.UbicationPageModule)
  },
  {
    path: 'hotels',
    loadChildren: () => import('./pages/hotels/hotels.module').then( m => m.HotelsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
