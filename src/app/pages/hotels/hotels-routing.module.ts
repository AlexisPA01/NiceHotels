import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelsPage } from './hotels.page';

const routes: Routes = [
  {
    path: '',
    component: HotelsPage
  },
  {
    path: 'hotel/:hotel',
    loadChildren: () => import('./hotel/hotel.module').then( m => m.HotelPageModule)
  }
  ,{
    path: 'hotel',
    loadChildren: () => import('./hotel/hotel.module').then( m => m.HotelPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsPageRoutingModule {}
