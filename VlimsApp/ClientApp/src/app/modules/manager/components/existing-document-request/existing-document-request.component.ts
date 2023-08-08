
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExistingDocumentRequest, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentRequestService } from '../../../services/existing-document-request.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-document-request',
  templateUrl: './existing-document-request.component.html',
  styleUrls: ['./existing-document-request.component.scss']
})
export class ExistingDocumentRequestComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [1, 10, 20, 50];

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private existingDocReqservice: ExistingDocumentRequestService) { }

  navigateToAddRequest(): void {
    this.router.navigate(['/existingdoc/add']);
  }

  existingDocDatasource: ExistingDocumentRequest[] = [];

  ngOnInit() {
    this.getdocumentrequest();    
   // this.existingDocDatasource = this.getDummyData();
    this.currentPage = 10;
    console.log(this.existingDocDatasource);
  }

  getdocumentrequest() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.existingDocReqservice.GetExistingDocumentAll(objrequest).subscribe((data: any) => {
      this.existingDocDatasource = data.response;
      if (this.existingDocDatasource.length < 10)
        this.currentPage = 10;
      console.log(data);
      this.spinner.hide();
    }, er => {
      console.error('An error occurred:', er);
      this.spinner.hide();
    });
  }

  editExistingDoc(existingDocReq: ExistingDocumentRequest) {
    this.commonsvc.existingDocReq = existingDocReq;
    this.router.navigate(['/existingdoc/edit/' + existingDocReq.edrId]);
  }

  getDummyData() {
    let estdoc = new ExistingDocumentRequest();
    estdoc.edrId = 0;
    estdoc.documenttitle = 'SOP for DMS';
    estdoc.documentno = 'QA/SAP/023';
    estdoc.documenttype = "SOP";
    estdoc.department = "QA"
    estdoc.effectiveDate = new Date()
    estdoc.reviewDate = new Date()
    return [estdoc];
  }

}


