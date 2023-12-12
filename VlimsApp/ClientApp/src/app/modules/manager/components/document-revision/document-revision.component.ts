import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentAdditionalTasks, DocumentRevisionRequest, DocumentTemplateConfiguration, RequestContext } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { DocumentRevisionService } from 'src/app/modules/services/document-revision.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';

@Component({
  selector: 'document-revision',
  templateUrl: './document-revision.component.html',
  styleUrls: ['./document-revision.component.scss'],
})
export class DocumentRevisionRequestsComponent implements OnInit{
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [1,10, 20, 50];
  access:boolean=false;
  constructor(private router: Router,private spinner: NgxSpinnerService, private commonsvc: CommonService, 
    private documentRevisionService: DocumentRevisionService,
    private templatesvc:DocumentTemplateServiceService
    ) {}

  navigateToAddRequest(): void {
    this.router.navigate(['/revision/add']);
  }

  revisionDatasource = [];

  ngOnInit() {   
    this.access = this.commonsvc.getUserRoles()?.documentRevison ?? false;
    this.getdocumentRevisions();

  }

  getStatusClass(status: string): string {
    if (status === 'In Progress' || status === 'InProgress') {
      return 'status-in-progress';
    } else if (status === 'REJECTED') {
      return 'status-reject';
    }else if (status === 'In-Progress') {
      return 'status-in-progress';
    } else if (status === 'Re-Initiated') {
      return 'status-under-review';
    }else if (status === 'Approved') {
      return 'status-approved';
    } else {
      return '';
    }
  }

  
  getdocumentRevisions() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.documentRevisionService.getdocumentRevisions(this.commonsvc.req).subscribe((data: any) => {     
      this.revisionDatasource = data.response;
      console.log('revisions',this.revisionDatasource);
      if(this.revisionDatasource.length<10)
      this.currentPage=10;
      this.spinner.hide();
    }, er => {
      console.error('An error occurred:', er);
      this.spinner.hide();
    });
  }

  editdocrevision(revision: DocumentAdditionalTasks) {
    this.commonsvc.revision = revision;
    this.router.navigate(['/revision/edit/'+revision.atid]);
  }
  ExportFiles(
    fileContent: any,
    fileType: string,
    fileName: string,
    fileExtension?: string
  ) {
    let variables = {};
    //CHECKING FILE CONTENT THERE OR NOT
    //if (!this.hasValue(fileContent))
      //SHOWING ERROR MESSAGE
      //this..Information("Unable to Export File, File Content Not Passed");
    //CHECKINg FILE NAME THERE OR NOT
    //if (!this.hasValue(fileName))
      //SHOWING ERROR MESSAGE
     // this.us.Information("Unable to Export File, File Name Not Passed");
    //EVEN WHEN WE PASS BYTE[] as error FROM API..ITS RECEIVING IN UI AS base64 string
    //FOR THAT CONVERTING THAT TO REQUIRED FORMAT
    var binary_string = window.atob(fileContent);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(
      new Blob([bytes], {
        type: fileType ? fileType : "application/octet-stream",
      })
    );
    link.download = fileName
      ? fileName + "." + fileExtension
      : this.GetGUID() + "." + fileExtension;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
  hasValue(value:any) {
    let variables = {};
    //  if(value===0)
    // {
    //   return true;
    // }
    // else
    if (value == null || value == undefined || value == "" || value == "NA") {
      return false;
    }
    return true;
  }
  GetGUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  previewtemplate(objtemp: DocumentRevisionRequest) {
    
    this.spinner.show();
    this.templatesvc.getTemplate(objtemp.template).subscribe((data: any) => {
    this.ExportFiles(data,"docx",objtemp.template,"docx");
    this.spinner.hide();
    }, (error:any) => {
      this.spinner.hide();
    });
  }
}
