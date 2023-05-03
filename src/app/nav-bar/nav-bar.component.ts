import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
      private localService: LocalService,
      private router: Router
  ) {}

  logout() {
    this.localService.clearData();
  }
}
