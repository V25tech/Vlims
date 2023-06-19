import { Component, Input } from '@angular/core';
import { Pricing } from '../pricing';

@Component({
  selector: 'exp-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  @Input('data') data: Pricing;

}
