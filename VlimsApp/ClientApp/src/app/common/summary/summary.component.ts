import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  visible: boolean = false;
  @Input() gridConfig: any = {};
  @Input() module: any = '';
  @Input() entityName: any = '';
  @Input() fieldsToShow: any = [];
  @Input() filedsofActivity: any = [];  
  constructor() {

  }
 

  ngOnInit() {

  }
  ngOnChanges() {
    console.log(this.gridConfig)
    console.log(this.module)
    console.log(this.entityName)
  }
  showDialog() {
    this.visible = true;
  }
  //getObjectKeys(obj: any): string[] {
  //  return obj ? Object.keys(obj) : [];
  //}
}
