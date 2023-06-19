import { Injectable } from '@angular/core';
import { NavigationItem } from './NavigationItem';
import { ApplicationContextService } from 'src/app/application-context.service';
import { UtilityService } from 'src/app/utility.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navigationitems: Array<NavigationItem> = null;
  subTopNavigations: Array<NavigationItem> = null;
  leftnavigationitems: Array<NavigationItem> = null;
  activated: any;
  next = function () { }
  previous = function () { }
  constructor(public appContext: ApplicationContextService, public us: UtilityService, private router: Router) {
  }

  additems = function (items: NavigationItem[]) {
    this.navigationitems = items;
  }
  updateNavItems(): any {
  }
  navigationResponseFeeder(resp: NavigationItem[]) {
    this.navigationitems = resp;
    if (this.router.url.indexOf('?') === -1) {
      this.updatedindex(this.router.url);
    } else {
      this.updatedindex(this.router.url.substring(0, this.router.url.indexOf('?')));
    }
  }
  updatedindex(path: string) {
    this.updateNavItems();
    let current = this.navigationitems.find(x => x.path == path), item, subLeftitems = [], secondTopItems = [], items = [];
    if (current) {
      this.navigationitems.forEach(x => {
        x.isActive = false;
        if ((x.Parent == path || '/' + current.Parent == x.path) && !item) {
          item = x;
        }
        if ((current.Parent && x.Parent == current.Parent) && !x.IsItemOfLastHirarchy) {
          secondTopItems.push(x);
        }

        if (current.GrandParent && x.GrandParent == current.GrandParent && x.IsItemOfLastHirarchy) {
          subLeftitems.push(x);
        } else if (current.Parent && x.Parent == current.Parent && x.GrandParent == undefined && x.IsItemOfLastHirarchy) {
          subLeftitems.push(x);
        }
        if (!x.Parent) {
          items.push(x);
        }
      });

      current.isActive = true;
      if (item) {
        item.isActive = true;
        this.activated = [item, current];
        if (current.GrandParent) {
          secondTopItems.forEach((item: NavigationItem) => {
            if (item.path == '/' + current.GrandParent) {
              item.isActive = true;
              this.activated.push(item);
            }
          })
        }
        this.updateitems(items, item);
      }
      else {
        this.activated = [current];
        this.updateitems(items, current);
      }
      this.subTopNavigations = secondTopItems;
      this.leftnavigationitems = subLeftitems;
    }

  }

  updateitems(items: NavigationItem[], current: NavigationItem) {
    let found = false, next = true;
    for (let i = 0; i < items.length; i++) {
      if (found && next && items[i].IsVisible) {
        items[i].nexttab = items[i].prevtab = null;
        current.nexttab = Object.assign(items[i]);
        next = false;
      }
      else if (items[i].path == current.path) {
        found = true;
      }
      if (!found && items[i].IsVisible) {
        current.prevtab = Object.assign(items[i]);
      }
    }
  }
}
