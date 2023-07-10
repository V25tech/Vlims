import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DocumentRequestConfiguration, DocumentTypeConfiguration } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentRequestService } from '../Services/document-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-document-request',
  templateUrl: './add-document-request.component.html',
  styleUrls: ['./add-document-request.component.css']
})
export class AddDocumentRequestComponent implements OnInit {
  adddocreq = new DocumentRequestConfiguration();
  constructor(private commonsvc: CommonService, private docReqServ: DocumentRequestService, private router: Router, private toastr: ToastrService) { }
    ngOnInit()
    {
      $('select').selectpicker();
  }
  submit(adddocreq: DocumentRequestConfiguration) {
      debugger

      this.adddocrequest(adddocreq);

    }
  adddocrequest(adddocreq: DocumentRequestConfiguration) {
      debugger
    adddocreq.CreatedBy = "admin";
    adddocreq.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.docReqServ.adddocreqconfig(adddocreq).subscribe((res: any) => {
        this.toastr.success('Added');
        this.router.navigate(['/mainpage/documentmanager']);
      });

    }
    closepopup() {
      this.router.navigate(['/mainpage/documentmanager']);
    }
  }

 


