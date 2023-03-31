import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedSitePageRoutingModule } from './recommended-site-routing.module';

import { RecommendedSitePage } from './recommended-site.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedSitePageRoutingModule,
    SwiperModule
  ],
  declarations: [RecommendedSitePage]
})
export class RecommendedSitePageModule {}
