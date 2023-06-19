import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) : boolean {
    let candeactivate = component.canDeactivate ? component.canDeactivate() : true;
    if(!candeactivate){
      return confirm('are you sure, you want to navigate?');
    }
    return true;
  }
}
