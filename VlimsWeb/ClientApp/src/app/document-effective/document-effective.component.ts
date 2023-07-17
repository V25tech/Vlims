import { Component, OnInit } from '@angular/core';
import { DocumentEffectiveConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentRequestService } from '../Services/document-request.service';
import { Router } from '@angular/router';
import { DocumentEffectiveService } from '../Services/document-effective.service';


@Component({
  selector: 'app-document-effective',
  templateUrl: './document-effective.component.html',
  styleUrls: ['./document-effective.component.css']
})
export class DocumentEffectiveComponent implements OnInit {
  name: string = 'Product Type';
  requests: Array<DocumentEffectiveConfiguration> = [];
  newtype: DocumentEffectiveConfiguration;
  objProductType: DocumentEffectiveConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentEffectiveService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    debugger;
    //this.tabselect = this.router.url.split('/').pop();
    this.getdocumentrequest();
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
  editBrand(docPrepInfo) {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    objrequest.Id = docPrepInfo.Id;
    return this.doctypeservice.getdocumentrequestbyId(objrequest).subscribe((data: any) => {
      debugger
      this.objProductType = data.response;
      this.loader.hide();
      console.log(this.objProductType);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
}
