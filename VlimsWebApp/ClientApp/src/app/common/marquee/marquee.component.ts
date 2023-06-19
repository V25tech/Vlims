import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'exp-marquee',
  templateUrl: './marquee.component.html'  
})
export class MarqueeComponent {
  @Input('data') data: Array<string>;
  @Input('title') title: string = '';
  @Input('scrollamount') scrollamount: number = 10;
  @Input('scrolldelay') scrolldelay: number = 5;
  @ViewChild('marquee', null) marquee: any;

  ngOnInit() {
    // this.marquee.nativeElement.attributes["scrollamount"].value = this.scrollamount < 10 ? 10 : this.scrollamount;
    // this.marquee.nativeElement.attributes["scrolldelay"].value = this.scrolldelay < 5 ? 5 : this.scrolldelay;
  }
}
