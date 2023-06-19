import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quote';

@Component({
  selector: 'exp-quotecomparison-card',
  templateUrl: './quotecomparison-card.component.html'
})
export class QuotecomparisonCardComponent {
  @Input() type: any;
  @Input() quote: Quote;
  @Output() buynow: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() coverageChange: EventEmitter<any> = new EventEmitter();
  @Output() attributeChange: EventEmitter<any> = new EventEmitter();

  isEnable: boolean = false;
  uid: string = '';
  constructor() {
    this.uid = '';
  }
  ngOnInit() {
    this.isEnable = this.type != 'custom';
  }
  coverageclick(coveragename) {
    for (let index = 0; index < this.quote.Coverages.length; index++) {
      if (coveragename === this.quote.Coverages[index].Name) {
        this.quote.Coverages[index].IsSelected = false;
        this.quote.Coverages[index].Attributes.forEach(element => {
          element.UserValue = "";
        });
        this.coverageChange.emit(this.quote.Coverages[index]);
        break;
      }
    }
  }
  attributeclick(coveragename, attribute, e) {
    for (let index = 0; index < this.quote.Coverages.length; index++) {
      if (coveragename === this.quote.Coverages[index].Name) {
        this.quote.Coverages[index].IsSelected = true;
        this.attributeChange.emit(attribute);
        break;
      }
    }
  }
  buynowclick() {
    this.buynow.emit(this.quote);
  }
}
