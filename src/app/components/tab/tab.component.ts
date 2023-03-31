import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  //encapsulation:ViewEncapsulation.Emulated
})
export class TabComponent implements OnInit {

  constructor(private router:Router) { 
    
  }

  ngOnInit() {    
  }

  goUbication(){
    this.router.navigateByUrl("ubication")
  }

}
