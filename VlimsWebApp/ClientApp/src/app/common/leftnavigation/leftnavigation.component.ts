import { Component, Input } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';
import { NavigationItem } from '../navigation/NavigationItem';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'left-navigation',
  templateUrl: './leftnavigation.component.html',
  styleUrls: ['./leftnavigation.component.css']
})
export class LeftnavigationComponent {
  routersubscription: Subscription = new Subscription();
  constructor(public ns: NavigationService, private r: Router) {
    if (this.ntype == 'left') {
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
  }

  @Input() ntype: string = 'left';
  expandInresponsive: boolean = false;
  trackthenavigationitem(index: number, navigationitem: NavigationItem) {
    return navigationitem.path;
  }
  get isLeftNavVisible(): boolean {
    return this.ntype == 'left' && this.ns.navigationitems.length > 0;
  }
  get istopleftNavVisible(): boolean {
    return this.ntype == 'topleft' && this.ns.leftnavigationitems.length > 0 && this.ns.subTopNavigations.length == 0;
  }
  get istopSubTopLeftVisible(): boolean {
    return this.ntype == "topSubTopleft" && this.ns.subTopNavigations.length > 0 && this.ns.leftnavigationitems.length > 0;
  }
  ngOnDestroy() {
    if (this.ntype == 'left') {
      this.routersubscription.unsubscribe();
    }
  }
}
