import { Component, OnInit } from '@angular/core';
import { RequestContext } from '../../../../models/model';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DocumentPrintConfiguration, DocumentRequestConfiguration } from '../../../../models/model';
import { DocumentPrintService } from '../../../services/document-print.service';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-print',
  templateUrl: './document-print.component.html',
  styleUrls:['./document-print.component.scss']
})
export class DocumentPrintComponent implements OnInit {
  name: string = 'Product Type';
  requests: DocumentPrintConfiguration[] = [];
  newtype = new DocumentPrintConfiguration();
  objProductType = new DocumentPrintConfiguration();
  requestsInfo: DocumentRequestConfiguration[] = [];
  retailId: number = 0;
  header: string = '';
  actiontype: number = 0;
  pageConfig: any;
  searchstr: string = '';
  access: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentPrintService, private docservice: DocumentPreperationService,
    private spinner: NgxSpinnerService,
     private router: Router) { }

  navigateToAddPrint(): void {
    this.router.navigate(['/print/add']);
  }
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentRevison ?? false;
    this.GetDocumentPrint();
  }

  GetDocumentPrint() {
    this.spinner.show();
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.GetDocumentPrint(this.commonsvc.req).subscribe((data: any) => {
      this.requests = data.response;
      console.log(this.requests);
      this.spinner.hide();
    });
  }
  getdocumentrequest() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docservice.getdocumentpreparations(this.commonsvc.req).subscribe((data: any) => {
      this.requestsInfo = data.response;
      this.spinner.hide();
    });
  }
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Approved') {
      return 'status-approved';
    } else if (status === 'Active') {
      return 'status-Active';
    }
    else {
      return '';
    }
  }
  editdoc(request: DocumentPrintConfiguration) {
    this.commonsvc.printConfig = request;
    this.router.navigate(['/print/edit']);
  }

}

