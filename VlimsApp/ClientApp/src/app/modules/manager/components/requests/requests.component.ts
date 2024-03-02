import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentRequestService } from 'src/app/modules/services/document-request.service';
import { DocumentRequestConfiguration, RequestContext } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit{
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  access:boolean=false;
  constructor(private router: Router,private spinner: NgxSpinnerService, private commonsvc: CommonService, private documentRequestService: DocumentRequestService) {}

  navigateToAddRequest(): void {
    this.router.navigate(['/requests/add']);
  }

  requestsDatasource = [];

  ngOnInit() {   
    debugger
    //this.dataPaginator.rows = 10;
    this.access = this.commonsvc.getUserRoles()?.documentRequest ?? false;
    this.getdocumentrequest();

  }

  getStatusClass(status: string): string {
    debugger
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Rejected') {
      return 'status-reject';
    }else if (status === 'Returned') {
      return 'status-return';
    }
    else if (status === 'In-Progress') {
      return 'status-in-progress';
    } else if (status === 'Re-Initiated') {
      return 'status-under-review';
    }else if (status === 'Approved') {
      return 'status-approved';
    } else {
      return '';
    }
  }

  
  getdocumentrequest() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.documentRequestService.getdocumentrequest(objrequest).subscribe((data: any) => {     
      this.requestsDatasource = data.response;
      if(this.requestsDatasource.length<10)
      {
      this.currentPage=10;
      }
      this.spinner.hide();
    }, er => {
      console.error('An error occurred:', er);
      this.spinner.hide();
    });
  }

  editdocreq(request: DocumentRequestConfiguration) {
    debugger
    this.commonsvc.request = request;
    this.router.navigate(['/requests/edit']);
  }
  // getdepartments() {

  //   let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
  //   this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
  //     debugger
  //     this.departs = data.Response;

  //   });
  // }
  // getdocumenttypeconfig() {
  //   let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
  //   this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
  //     debugger
  //     this.doctypes = data.Response;
  //   });
  // }
  islocked(status:string): boolean{
    switch (status) {
      case 'Reviewed':
        return true;
        case 'Approved':
        return true;
        case 'REVIEWED':
        return true;
        case 'APPROVED':
        return true;
        case 'Rejected':
        return false;
        case 'Returned':
        return false;
      default:
        return false;
    }
  }
}
