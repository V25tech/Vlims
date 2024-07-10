import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';

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
  @Input() title: any = '';
  @Input() fieldsToShow: any = [];
  @Input() filedsofActivity: any = [];
  constructor(public commonsrvc: CommonService) {

  }
  ngOnInit() {
   
  }

  ngOnChanges() {
    console.log(this.module)
    console.log(this.entityName)
    console.log(this.gridConfig)
  }
  showDialog() {
    this.visible = true;
  }
  groupedRecordsKeys(): number[] {
    return Object.keys(this.gridConfig).map(Number);
  }

  //getObjectKeys(obj: any): string[] {
  //  return obj ? Object.keys(obj) : [];
  //}
}
