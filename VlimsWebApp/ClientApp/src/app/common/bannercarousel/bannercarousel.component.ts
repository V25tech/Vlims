import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'exp-bannercarousel',
  templateUrl: './bannercarousel.component.html'
})
export class BannercarouselComponent {
  @Input('data') data: Array<any>;
  // @ViewChild('carousel', null) carousel: any;
  // showarrows: boolean = false;
  // intervel: any;

  // ngOnInit() {
  //   this.getIntervel();
  //   this.intervel;
  // }
  // mouseenter() {
  //   if (this.intervel)
  //     clearInterval(this.intervel);
  //   this.showarrows = true;
  // }
  // mouseleave() {
  //   this.getIntervel()
  //   this.intervel;
  //   this.showarrows = false;
  // }
  // getIntervel() {
  //   this.intervel = setInterval(() => {
  //     this.carousel.next();
  //   }, 2500);
  // }
}
