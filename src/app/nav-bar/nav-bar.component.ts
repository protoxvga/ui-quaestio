import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  logged= false
  currentUrl = ""
  constructor(
      private localService: LocalService,
      private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.currentUrl = event.url.split('/')[1];
    });
    if (localService.getData('user') != null)
      this.logged = true;
  }

  logout() {
    this.localService.clearData();
  }
}
