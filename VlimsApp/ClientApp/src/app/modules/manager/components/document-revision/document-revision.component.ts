import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentAdditionalTasks, RequestContext } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { DocumentRevisionService } from 'src/app/modules/services/document-revision.service';

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
  constructor(private router: Router,private spinner: NgxSpinnerService, private commonsvc: CommonService, private documentRevisionService: DocumentRevisionService) {}

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
    return this.documentRevisionService.getdocumentRevisions(objrequest).subscribe((data: any) => {     
      this.revisionDatasource = data.response;
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
  
}
