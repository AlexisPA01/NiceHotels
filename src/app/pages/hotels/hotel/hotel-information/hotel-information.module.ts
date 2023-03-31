import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelInformationPageRoutingModule } from './hotel-information-routing.module';

import { HotelInformationPage } from './hotel-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelInformationPageRoutingModule
  ],
  declarations: [HotelInformationPage]
})
export class HotelInformationPageModule {}
