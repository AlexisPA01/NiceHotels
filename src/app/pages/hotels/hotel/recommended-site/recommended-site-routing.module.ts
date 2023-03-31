import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedSitePage } from './recommended-site.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedSitePageRoutingModule {}
