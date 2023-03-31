import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelInformationPage } from './hotel-information.page';

const routes: Routes = [
  {
    path: '',
    component: HotelInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelInformationPageRoutingModule {}
