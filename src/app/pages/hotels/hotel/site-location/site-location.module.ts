import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiteLocationPageRoutingModule } from './site-location-routing.module';

import { SiteLocationPage } from './site-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiteLocationPageRoutingModule
  ],
  declarations: [SiteLocationPage]
})
export class SiteLocationPageModule {}
