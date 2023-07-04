import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(private commonsvc: CommonService, public router: Router) { }

  canActivate(): boolean {
    // if (this.commonsvc.getretailId() === 0) {
    //   this.router.navigate(['']);
    //   return false;
    // }
    return true;
  }
}

