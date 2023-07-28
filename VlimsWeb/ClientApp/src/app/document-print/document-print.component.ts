

import { Component, OnInit } from '@angular/core';
import { DocumentPrint, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
//import { DocumentPrintService } from '../document-print.service';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DocumentPrintService } from '../Services/document-print.service';

@Component({
  selector: 'app-document-request',
  templateUrl: './document-print.component.html',
  styleUrls: ['./document-print.component.css']
})
export class DocumentPrintComponent implements OnInit {
  name: string = 'Product Type';
  requests: Array<DocumentPrintService> = [];
  newtype: DocumentPrintService;
  objProductType: DocumentPrintService;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentPrintService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    debugger;
    //this.tabselect = this.router.url.split('/').pop();
    this.GetDocumentPrint();
  }


  GetDocumentPrint() {
    this.loader.show();
    let objrequest: RequestContext = {
        PageNumber: 1, PageSize: 50,
        Id: 0
    };
    return this.doctypeservice.GetDocumentPrint(objrequest).subscribe((data: any) => {
      debugger
      this.requests = data.response;
      this.loader.hide();
      console.log(this.requests);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }

}

