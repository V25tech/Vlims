
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DataGrid } from 'src/app/common/auditgrid';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-auditprintgridpagew',
  templateUrl: './auditprintgridpagew.component.html',
  styleUrls: ['./auditprintgridpagew.component.scss']
})
export class AuditprintgridpagewComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: AuditConfiguration[] = [];
  
  viewMode:boolean=false;
  access:boolean=false;
  prefix: any;
  globalFilterFields: string[] = [
    'printtype',
    'documenttitle',
    'documentNumber',
    'noofcopies',
    'createdBy',
    'printCount',
    'status'
  ];
  public gridConfig = new DataGrid();
  constructor(private commonsvc: CommonService, private auditservice: AuditConfiurationService,private loader: NgxSpinnerService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.deptConfig ?? false;
    this.setHeaders();
    this.setConfig();
    this.getauditmodule();
    this.route.queryParams.subscribe(params => {
      this.prefix = params['prefix'];
      // Now you have the prefix value here, you can use it as needed
    });
  }
  setHeaders() {
    this.gridConfig.Headers = [
      { Name: 'PrepId', DisplayName: 'Print Id', width: 20, sort: false, isNavigation: true },
      { Name: 'DocumentNumber', DisplayName: 'Document Number', width: 25, sort: false, isNavigation: false },
      { Name: 'workflow', DisplayName: 'Workflow Name', width: 25, sort: false, isNavigation: false },
      { Name: 'CreatedBy', DisplayName: 'Printed by', width: 20, sort: false, isNavigation: false },
      { Name: 'CreatedDate', DisplayName: 'Printed on', width: 10, sort: false, isNavigation: false },
      { Name: 'RevisionNumber', DisplayName: 'Revision', width: 10, sort: false, isNavigation:false }
    ]
  }
  setConfig() {
    this.gridConfig.Config = {
      itemsPerPage : 10,
      currentPage: 1,
      rowsPerPageOptions: [10, 20, 50],
      gridDisplayName: "Document Print List Audit Trails"
    }
  }
  
  getauditmodule() {
    
    this.loader.show();
    this.commonsvc.req.type="PrintType";
    this.auditservice.getAuditModule(this.commonsvc.req).subscribe((data: any) => {
      
      this.types = this.removeDuplicates(data, 'Unique'); // Filter duplicates based on EntityName
      this.gridConfig.gridData = this.types;
      if (this.gridConfig.Config != undefined)  this.gridConfig.Config.itemsPerPage = this.types.length;
      this.loader.hide();
    }, er => {
      this.loader.hide();
    });
  }
  
  // Function to remove duplicate entries from an array based on a specific property
  removeDuplicates(array: any[], property: string): any[] {
    return array.filter((obj, index, self) =>
      index === self.findIndex((o) => (
        o[property] === obj[property]
      ))
    );
  }
  handleAction(event: any) {
    console.log(event);
    this.router.navigate(["./../auditprinttaddpage"], { queryParams: { DocumentName: event.route.entityObj.reason } });
  }
}
