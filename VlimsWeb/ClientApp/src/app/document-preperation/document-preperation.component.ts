import { Component, OnInit } from '@angular/core';
import { DocumentPreperationConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentRequestService } from '../Services/document-request.service';
import { Router } from '@angular/router';
import { DocumentPreperationService } from '../Services/document-preperation.service';

@Component({
  selector: 'app-document-preperation',
  templateUrl: './document-preperation.component.html',
  styleUrls: ['./document-preperation.component.css']
})



export class DocumentPreperationComponent implements OnInit {
  name: string = 'Product Type';
  requests: Array<DocumentPreperationConfiguration> = [];
  request: DocumentPreperationConfiguration;
  newtype: DocumentPreperationConfiguration;
  //objProductType: DocumentPreperationConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentPreperationService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

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
  editBrand(editband: DocumentPreperationConfiguration) {
    this.commonsvc.docPreperation = editband;
    debugger;
    this.loader.show();
    this.router.navigate(['/mainpage/documentmanager/editdocprep']);   
  }
 
}
