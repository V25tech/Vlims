import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentRequestService } from 'src/app/modules/services/document-request.service';
import { DocumentRequestConfiguration, RequestContext } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit{
  constructor(private router: Router,private spinner: NgxSpinnerService, private commonsvc: CommonService, private documentRequestService: DocumentRequestService) {}

  navigateToAddRequest(): void {
    this.router.navigate(['/requests/add']);
  }

  requestsDatasource = [];

  ngOnInit() {   
    this.getdocumentrequest();

  }

  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
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
      console.log(data);
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
  
}
