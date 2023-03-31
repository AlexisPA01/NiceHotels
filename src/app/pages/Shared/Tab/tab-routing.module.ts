import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../../home/home.page';

const routes: Routes = [
  {
    path:'',
    component:HomePage,
    children:[
      {
        path: 'ubication',
        loadChildren: () => import('./pages/Ubication/ubication.module').then( m => m.UbicationPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
