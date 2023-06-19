import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderscount: number = 0;
  public isloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    if (this.loaderscount == 0) {
      this.isloading.next(true);
    }
    this.loaderscount++;
  }
  hide() {
    if (this.loaderscount == 1)
      this.isloading.next(false);
    this.loaderscount--;
  }

  hideall() {
    this.loaderscount = 0;
    this.isloading.next(false);
  }
}
