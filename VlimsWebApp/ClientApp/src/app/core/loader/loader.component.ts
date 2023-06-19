import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'loader',
  template: `
  
  <div class="loader" *ngIf="showLoader">
  
  </div>`,
  styles: [`
  .loader {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      opacity:0;
    }
    
    `]
})
export class LoaderComponent {
  showLoader: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.isloading.subscribe((value: boolean) => {
      this.showLoader = value;
    });
  }
}
