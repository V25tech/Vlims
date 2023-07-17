import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DocumentPreperationConfiguration } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentPreperationService } from '../Services/document-preperation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documentprep-add',
  templateUrl: './documentprep-add.component.html',
  styleUrls: ['./documentprep-add.component.css']
})
export class DocumentprepAddComponent implements OnInit {
  adddocreq = new DocumentPreperationConfiguration();
  constructor(private commonsvc: CommonService, private docReqServ: DocumentPreperationService, private router: Router, private toastr: ToastrService) { }
  ngOnInit() {
    $('select').selectpicker();
  }
  submit(adddocreq: DocumentPreperationConfiguration) {
    debugger
    this.adddocrequest(adddocreq);
  }
  adddocrequest(adddocreq: DocumentPreperationConfiguration) {
    debugger
    adddocreq.CreatedBy = "admin";
    adddocreq.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.docReqServ.ManageDocument(adddocreq).subscribe((res: any) => {
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentpreperation']);
    });
  }
  closepopup() {
    this.router.navigate(['/mainpage/documentpreperation']);
  }

}
