import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataGrid } from '../auditgrid';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';


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
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  @ViewChild('templatesTable') templatesTable!: Table; // ViewChild to get reference to the p-table component

  // Pagination properties
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
