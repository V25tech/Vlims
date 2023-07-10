import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DocumentTypeConfiguration } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';


//declare var $: any;

@Component({
  selector: 'app-add-document-type-config',
  templateUrl: './add-document-type-config.component.html',
  styleUrls: ['./add-document-type-config.component.css']
})
export class AddDocumentTypeConfigComponent implements OnInit {
 adddoc = new DocumentTypeConfiguration();
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTypeServiceService,
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    $('select').selectpicker();
  }

  submit(doctype: DocumentTypeConfiguration) {
  debugger
    
      this.adddoctype(doctype);
    
  }
  adddoctype(doctype: DocumentTypeConfiguration) {
    debugger
    doctype.CreatedBy="admin";
    doctype.ModifiedBy = "admin";
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(doctype.CreatedDate, format, locale);
    doctype.CreatedDate = formattedDate;
    this.doctypeservice.adddoctypeconfig(doctype).subscribe((res:any)=>{
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentmaster']);
    });
    
    
  }
  closepopup() {
    this.router.navigate(['/mainpage/documentmaster']);
  }
}
