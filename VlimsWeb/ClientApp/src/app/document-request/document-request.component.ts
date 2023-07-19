import { Component, OnInit } from '@angular/core';
import { DepartmentConfiguration, DocumentRequestConfiguration, DocumentTypeConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentRequestService } from '../Services/document-request.service';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { DepartmentComponent } from '../department/department.component';

@Component({
  selector: 'app-document-request',
  templateUrl: './document-request.component.html',
  styleUrls: ['./document-request.component.css']
})
export class DocumentRequestComponent implements OnInit {
  name: string = 'Product Type';
  requests: Array<DocumentRequestConfiguration> = [];
  newtype: DocumentRequestConfiguration;
  objProductType: DocumentRequestConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  doctypes: Array<DocumentTypeConfiguration> = [];
  departs: Array<DepartmentConfiguration> = [];
  constructor(private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private doctypeservice: DocumentRequestService, private doctypeserv: DocumentTypeServiceService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    debugger;
    this.getdocumentrequest();
    this.getdepartments();
    this.getdocumenttypeconfig();
  }


  getdocumentrequest() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.doctypeservice.getdocumentrequest(objrequest).subscribe((data: any) => {
      debugger
      this.requests = data.response;
      this.loader.hide();
      console.log(this.requests);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
  editdocreq(editband: DocumentRequestConfiguration) {
    debugger
    this.commonsvc.docrequest = editband;
    this.router.navigate(['/mainpage/documentmanager/editdocreq']);
  }
  getdepartments() {

    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      debugger
      this.departs = data.Response;

    });
  }
  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      debugger
      this.doctypes = data.Response;
    });
  }

}
