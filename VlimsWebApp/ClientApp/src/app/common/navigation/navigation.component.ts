import { Component, OnDestroy, Input } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationItem } from './NavigationItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnDestroy {
  @Input() ntype: string = 'top';
  @Input() istabstyle: boolean = false;
  @Input('issubtopntype') isSubTopNavigationAvailable: boolean = false;
  private routersubscription = new Subscription();


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

  ngOnDestroy() {
    this.routersubscription.unsubscribe();
  }
  trackthenavigationitem(index: number, navigationitem: NavigationItem) {
    return navigationitem.path;
  }
}
