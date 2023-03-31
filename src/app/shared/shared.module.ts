import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../components/tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [TabComponent, SidemenuComponent],
  imports: [CommonModule, IonicModule.forRoot(), RouterModule],
  exports: [TabComponent, SidemenuComponent],
})
export class SharedModule {}
