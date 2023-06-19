import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'exp-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('changeSize', [
      state('open', style({
        'display': 'block',
        'max-height': '*'
      })),
      state('close', style({
        'display': 'none',
        'max-height': '0px',
        'border': 'none'
      })),
      transition('* => *', [
        animate('0s')
      ]),
    ])
  ]
})
export class TabComponent implements OnInit {
  @Input('title') title = '';
  @Input('price') price = 0;
  @Input('child') child = '';
  @Input('customClass') customClass: string;
  tabstate = 'close';
  changeState() {
    this.tabstate = this.tabstate === 'open' ? 'close' : 'open';
  }
  ngOnInit() {
  }
  public get isChild(): boolean {
    return this.child != "";
  }
}
