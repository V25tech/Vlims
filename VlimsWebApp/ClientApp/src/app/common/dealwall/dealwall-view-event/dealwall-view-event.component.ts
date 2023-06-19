import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exp-dealwall-view-event',
  templateUrl: './dealwall-view-event.component.html',
  styleUrls: ['./dealwall-view-event.component.scss']
})
export class DealwallViewEventComponent {
  @Input('data') data: any;
}
