import { Component, OnInit, ViewChild } from '@angular/core';

import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { AuditConfiguration } from '../models/model';
import { CommonService } from '../shared/common.service';
import { DepartmentconfigurationService } from '../modules/services/departmentconfiguration.service';
import { AuditConfiurationService } from '../modules/services/audit-module-service.service';


@Component({
  selector: 'app-auditlog-component',
  templateUrl: './auditlog-component.component.html',
  styleUrls: ['./auditlog-component.component.scss']
})
export class AuditlogComponentComponent {

  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: AuditConfiguration[] = [];
  griddata:AuditConfiguration[]=[];
  viewMode:boolean=false;
  access:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService, private auditservice: AuditConfiurationService,private loader: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.deptConfig ?? false;
    this.getauditmodule();
  }
  getauditmodule() {
    this.loader.show();
    debugger;
       return this.auditservice.getAuditModule(this.commonsvc.req).subscribe((data: any) => {
        debugger;
         this.griddata=data;
         this.types=data;
         this.loader.hide();
       }, er => {
         this.loader.hide();
       });
 }
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    }else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    }else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return 'Success';
    }
  }
 
  editBrand(doc : AuditConfiguration)
  {
    this.router.navigate(['/admin/hierarchy/departments/edit', doc.id]);
  }
}
