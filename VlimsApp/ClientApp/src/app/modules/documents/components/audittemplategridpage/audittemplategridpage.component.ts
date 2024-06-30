import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DataGrid } from 'src/app/common/auditgrid';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-audittemplategridpage',
  templateUrl: './audittemplategridpage.component.html',
  styleUrls: ['./audittemplategridpage.component.scss']
})
export class AudittemplategridpageComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: AuditConfiguration[] = [];
  
  viewMode:boolean=false;
  access:boolean=false;
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
  constructor(private commonsvc: CommonService, private auditservice: AuditConfiurationService,private loader: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.deptConfig ?? false;
    this.setHeaders();
    this.setConfig();
    this.getauditmodule();
  }


  setHeaders() {
    this.gridConfig.Headers = [
      { Name: 'Uniquecode', DisplayName: 'Template Code', width: 20, sort: false, isNavigation: true },
      { Name: 'Templatename', DisplayName: 'Template Name', width: 25, sort: false, isNavigation: false },
      { Name: 'CreatedBy', DisplayName: 'Initiated by', width: 20, sort: false, isNavigation: false },
      { Name: 'CreatedDate', DisplayName: 'Initiated on', width: 10, sort: false, isNavigation: false },
      { Name: 'RevisionNumber', DisplayName: 'Revision', width: 10, sort: false, isNavigation:false }
      
    ]
  }
  setConfig() {
    this.gridConfig.Config = {
      itemsPerPage : 10,
      currentPage: 1,
      rowsPerPageOptions: [10, 20, 50],
      gridDisplayName: "Document Template List Audit Trails"
    }
  }
  

  getauditmodule() {
    this.loader.show();
    
    this.commonsvc.req.type="TemplateType"
       return this.auditservice.getAuditModule(this.commonsvc.req).subscribe((data: any) => {
        this.types = this.removeDuplicates(data, 'Unique'); 
       // this.types.reverse(); // Reverse the array here
        this.gridConfig.gridData = this.types;
        if (this.gridConfig.Config != undefined)  this.gridConfig.Config.itemsPerPage = this.types.length;
         this.loader.hide();
       }, er => {
         this.loader.hide();
       });
 }

 removeDuplicates(array: any[], property: string): any[] {
  debugger
  return array.filter((obj, index, self) =>
    index === self.findIndex((o) => (
      o[property] === obj[property]
    ))
  );
}

handleAction(event: any) {
  console.log(event);
  this.router.navigate(["../auditgridaddpagetemplate"], { queryParams: { DocumentName: event.route.entityObj.Uniquecode } });
}

}
