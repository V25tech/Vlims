import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'exp-quotecomparison',
  templateUrl: './quotecomparison.component.html'
})
export class QuotecomparisonComponent {
  @Input('basicquote') BasicQuote: any;
  @Input('fullquote') FullQuote: any;
  @Input('customquote') CustomQuote: any;

  @Output() buynow: EventEmitter<any> = new EventEmitter();
  @Output() coverageChange: EventEmitter<any> = new EventEmitter();
  @Output() attributeChange: EventEmitter<any> = new EventEmitter();

  //buynow1(e, type) {
  //  this.buynow.emit({ type: type, quote: e });
  //}
  //covChange(cov, type) {
  //  this.coverageChange.emit({ type: type, coverage: cov });
  //}
  //attrChange(attr, type) {
  //  this.attributeChange.emit({ type: type, attribute: attr });
  //}
  //cardcssclass = "";
  //public loadScript(): void {
  //  let scripts = document.getElementsByTagName("script"), count = scripts.length, isfound = false;
  //  for (var i = 0; i < count; ++i) {
  //    if (scripts[i].src != null && scripts[i].src.includes("owl.carousel")) {
  //      isfound = true;
  //    }
  //  }
  //  if (!isfound) {
  //    let node = document.createElement('script');
  //    node.src = 'assets/js/owl.carousel.js';
  //    node.type = 'text/javascript';
  //    document.getElementsByTagName('head')[0].appendChild(node);

  //    node = document.createElement('script');
  //    node.src = 'assets/js/carousel.js';
  //    node.type = 'text/javascript';
  //    document.getElementsByTagName('head')[0].appendChild(node);
  //  }
  //}

  //ngAfterViewInit() {
  //  this.loadScript();
  //  let count = 0;
  //  if (this.BasicQuote != null) {
  //    count++;
  //  }
  //  if (this.FullQuote != null) {
  //    count++;
  //  }
  //  if (this.CustomQuote != null) {
  //    count++;
  //  }
  //  if (count) {
  //    this.cardcssclass = "col-lg-" + (12 / count);
  //  }
  //}
}
