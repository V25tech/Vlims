
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExistingDocumentRequest, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentRequestService } from '../../../services/existing-document-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-document-request',
  templateUrl: './existing-document-request.component.html',
  styleUrls: ['./existing-document-request.component.scss']
})
export class ExistingDocumentRequestComponent implements OnInit {
  existingDocReq: ExistingDocumentRequest = new ExistingDocumentRequest();
  editMode = false;
  viewMode = false;
  fileUploadLink = '';
  id: string = '';
  constructor(private commonsvc: CommonService, private location: Location, private spinner: NgxSpinnerService, private existingDocReqservice: ExistingDocumentRequestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.editMode = true;
      if (this.commonsvc.existingDocReq)
        this.existingDocReq = this.commonsvc.existingDocReq;
      else
        this.getExistingDocument(this.id);
    }
  }

  adddExistingDocument() {
    this.spinner.show();
    this.existingDocReqservice.adddExistingDocument(this.existingDocReq).subscribe(res => {
      this.spinner.hide();
      this.location.back();
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }

  getExistingDocument(id: string) {
    this.spinner.show();
    this.existingDocReqservice.GetExistingDocumentById(id).subscribe((res: any) => {
      this.existingDocReq = res;
      this.spinner.hide();
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }

  onCancel() {
    this.location.back();
  }

}


