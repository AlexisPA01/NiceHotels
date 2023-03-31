import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLocationPage } from './site-location.page';

const routes: Routes = [
  {
    path: '',
    component: SiteLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteLocationPageRoutingModule {}
