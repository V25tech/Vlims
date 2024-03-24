import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-auditdocumenttypesgridpage',
  templateUrl: './auditdocumenttypesgridpage.component.html',
  styleUrls: ['./auditdocumenttypesgridpage.component.scss']
})
export class AuditdocumenttypesgridpageComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: AuditConfiguration[] = [];
  
  viewMode:boolean=false;
  access:boolean=false;
  prefix: any;
  constructor(private commonsvc: CommonService, private auditservice: AuditConfiurationService,private loader: NgxSpinnerService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.deptConfig ?? false;
    this.getauditmodule();
    this.route.queryParams.subscribe(params => {
    this.prefix = params['prefix'];
      // Now you have the prefix value here, you can use it as needed
  });
  }
  getauditmodule() {
    this.loader.show();
    debugger;
    this.commonsvc.req.type="DocumentType"
       return this.auditservice.getAuditModule(this.commonsvc.req).subscribe((data: any) => {
        debugger;
         
         this.types=data;
         this.loader.hide();
       }, er => {
         this.loader.hide();
       });
 }
}
