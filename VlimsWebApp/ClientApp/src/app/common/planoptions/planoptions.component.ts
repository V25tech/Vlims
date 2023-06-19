import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlanOption } from './plan';

@Component({
  selector: 'exp-planoptions',
  templateUrl: './planoptions.component.html'
})
export class PlanoptionsComponent {
  @Input("data") planoptions: Array<PlanOption>;
  @Input("selectedindex") selectedindex: string;
  @Input("selectedplan") selectedplan: string;
  @Output() makepay: EventEmitter<any> = new EventEmitter();

  //makepayment(index, planoption: PlanOption) {
  //  this.makepay.emit({ index: index, selectedplan: planoption });
  //}

  //public getname(type: any) {
  //  return "<button>" + type + "</button>";
  //}

  //public loadScript(): void {
  //  let scripts = document.getElementsByTagName("script"), count = scripts.length, isfound = false;
  //  for (var i = 0; i < count; ++i) {
  //    if (scripts[i].src != null && scripts[i].src.includes("owl.carousel")) {
  //      isfound = true;
  //      break;
  //    }
  //  }
  //  if (!isfound) {
  //    let node = document.createElement('script');
  //    node.src = 'assets/js/owl.carousel.js';
  //    node.type = 'text/javascript';
  //    document.getElementsByTagName('head')[0].appendChild(node);

  //    node = document.createElement('script');
  //    node.src = 'assets/js/carouselplanoptions.js';
  //    node.type = 'text/javascript';
  //    document.getElementsByTagName('head')[0].appendChild(node);
  //  }
  //}
}
