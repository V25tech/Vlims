import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../navigation/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationItem } from '../navigation/NavigationItem';

@Component({
  selector: 'app-subtopnavigation',
  templateUrl: './subtopnavigation.component.html'
})
export class SubtopnavigationComponent implements OnInit, OnDestroy {
  private routersubscription = new Subscription();
  expandInresponsive: boolean = false;
  constructor(public ns: NavigationService, private r: Router) {
    this.routersubscription = r.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        if (x.urlAfterRedirects.indexOf('?') === -1) {
          this.ns.updatedindex(x.urlAfterRedirects);
        }
        else {
          let url = x.urlAfterRedirects.substring(0, x.urlAfterRedirects.indexOf('?'));
          this.ns.updatedindex(url);
        }
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.routersubscription.unsubscribe();
  }
  trackthenavigationitem(index: number, navigationitem: NavigationItem) {
    return navigationitem.path;
  }
}
