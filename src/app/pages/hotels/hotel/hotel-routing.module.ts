import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelPage } from './hotel.page';

const routes: Routes = [
  {
    path: '',
    component: HotelPage
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'hotel-information',
    loadChildren: () => import('./hotel-information/hotel-information.module').then( m => m.HotelInformationPageModule)
  },
  {
    path: 'hotel-information/:hotel',
    loadChildren: () => import('./hotel-information/hotel-information.module').then( m => m.HotelInformationPageModule)
  },
  {
    path: 'room/:room/:id',
    loadChildren: () => import('./room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'restaurant/:restaurant/:id',
    loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'recommended-site/:id',
    loadChildren: () => import('./recommended-site/recommended-site.module').then( m => m.RecommendedSitePageModule)
  },
  {
    path: 'site-location/:id',
    loadChildren: () => import('./site-location/site-location.module').then( m => m.SiteLocationPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelPageRoutingModule {}
