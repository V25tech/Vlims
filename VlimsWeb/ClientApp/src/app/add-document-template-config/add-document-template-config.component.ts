import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { DocumentTemplateConfiguration, DocumentTypeConfiguration, RequestContext } from '../model/models';
import { DocumentTemplateServiceService } from '../Services/document-template-service.service';

@Component({
  selector: 'app-add-document-template-config',
  templateUrl: './add-document-template-config.component.html',
  styleUrls: ['./add-document-template-config.component.css']
})
export class AddDocumentTemplateConfigComponent implements OnInit {
  doctypes: Array<DocumentTypeConfiguration>=[];
  newdoctemplate=new DocumentTemplateConfiguration();
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTypeServiceService  ,
    private doctemplateservice:DocumentTemplateServiceService,
    private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getdocumenttypeconfig();
  }
 getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1};
      return this.doctypeservice.getdoctypeconfig(objrequest).subscribe((data: any) => {
        debugger
        this.doctypes = data.Response;
        debugger
        this.loader.hide();
        console.log(this.doctypes);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
  submit(doctype: DocumentTemplateConfiguration) {
    debugger
      
        this.adddoctype(doctype);
      
    }
    adddoctype(doctype: DocumentTemplateConfiguration) {
      debugger
      doctype.CreatedBy="admin";
      doctype.ModifiedBy="admin";
      
      
      //this.router.navigate(['/products']);
      this.doctemplateservice.adddoctemplate(doctype).subscribe((res:any)=>{
        this.toastr.success('Added');
        this.router.navigate(['/mainpage/documentmaster/doctemplate']);
      });
      
      
    }
    closepopup() {
      this.router.navigate(['/mainpage/documentmaster/doctemplate']);
    }
}
