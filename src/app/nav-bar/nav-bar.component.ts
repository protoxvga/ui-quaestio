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
  barSearch = {
    "type": 'title',
    "term": ''
  }

  constructor(
      private localService: LocalService,
      private router: Router
  ) {
    // we use the router to get the current url we are, so we can change the navbar active link part for each page
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

  onSubmit() {
    console.log(`Search Type: ${this.barSearch.type}, Search Term: ${this.barSearch.term}`);
    let type = this.barSearch.type;
    let term = this.barSearch.term;
    this.router.navigate(['searchResult', type, term])
  }
}
