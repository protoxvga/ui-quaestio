import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  logged= false
  constructor(
      private localService: LocalService,
      private router: Router
  ) {
    if (localService.getData('user') != null)
      this.logged = true;
  }

  logout() {
    this.localService.clearData();
  }
}
