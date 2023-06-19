import { Component, Input } from '@angular/core';
@Component({
  selector: 'exp-Panel',
  templateUrl: './Panel.component.html',
})
export class PanelComponent {
  public isExpanded: boolean = true;
  @Input() isCollapsable: boolean = true;
  @Input() Name: string;
  @Input() isHeader: boolean = true;
}
