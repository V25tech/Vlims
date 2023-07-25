import { Component, OnInit } from '@angular/core';
import { DocumentRevisonConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { DocumentRevisonService } from '../Services/document-revison.service';

@Component({
  selector: 'app-document-revison',
  templateUrl: './document-revison.component.html',
  styleUrls: ['./document-revison.component.css']
})
export class DocumentRevisonComponent implements OnInit {
  name: string = 'Product Type';
  requests: Array<DocumentRevisonConfiguration> = [];
  newtype: DocumentRevisonConfiguration;
  objProductType: DocumentRevisonConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;

  constructor(private commonsvc: CommonService, private docrevservice: DocumentRevisonService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
  }
  getdocumentrequest() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docrevservice.getdocumentrevison(objrequest).subscribe((data: any) => {
      debugger
      this.requests = data.response;
      this.loader.hide();
      console.log(this.requests);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
  editBrand(editband: DocumentRevisonConfiguration) {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    //objrequest.Id = editband.DTCId;
    //this.doctypeservice.getdocumentrequestbyId(objrequest).subscribe((data: any) => {
    //  debugger
    //  this.objProductType = data.response;
    this.commonsvc.docEffecConfig = editband;
    this.router.navigate(['/mainpage/documentmanager/documeffectedit']);

    //});
  }
}
