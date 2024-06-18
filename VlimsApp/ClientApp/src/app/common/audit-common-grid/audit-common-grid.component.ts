import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataGrid } from '../auditgrid';

@Component({
  selector: 'app-audit-common-grid',
  templateUrl: './audit-common-grid.component.html',
  styleUrls: ['./audit-common-grid.component.scss']
})
export class AuditCommonGridComponent {
  @Input() gridConfig: any;
  @Output() action = new EventEmitter<any>();
  @Input() filterAttributes: string[] = [];  // Ensure this is declared as an input
  /*rowsPerPageOptions = [10, 20, 50];*/
  public route: any = {};
  
  constructor(public router: Router, public activate: ActivatedRoute) {

  }
  ngOnInit() {
   
  }

  ngOnChanges() {
    console.log(this.gridConfig);
  }
  navigate(data: any, type: string) {
    this.route.type = type;
    this.route.entityObj = data;
    this.action.emit({'route': this.route });
  }

}
