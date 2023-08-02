import { Component, OnInit } from '@angular/core';
import { RequestContext } from '../../../../models/model';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DocumentPrintConfiguration, DocumentRequestConfiguration } from '../../../../models/model';
import { DocumentPrintService } from '../../../services/document-print.service';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';

@Component({
  selector: 'app-document-print',
  templateUrl: './document-print.component.html'
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
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentPrintService, private docservice: DocumentPreperationService, private router: Router) { }

  navigateToAddPrint(): void {
    debugger;
    this.router.navigate(['/print/add']);
  }
  ngOnInit() {
    debugger;
    //this.tabselect = this.router.url.split('/').pop();
    this.GetDocumentPrint();

  }


  GetDocumentPrint() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.GetDocumentPrint(objrequest).subscribe((data: any) => {
      debugger
      this.requests = data.response;
      console.log(this.requests);
    });
  }
  getdocumentrequest() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docservice.getdocumentpreparations(objrequest).subscribe((data: any) => {
      debugger
      this.requestsInfo = data.response;
    });
  }
  getStatusClass(status: string): string {
    debugger;
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
    debugger
    this.commonsvc.printConfig = request;
    this.router.navigate(['/print/edit']);
  }

}

