import { Component,ChangeDetectorRef, OnInit,Directive,Input } from '@angular/core';
import { FormGroup} from '@angular/forms';
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
  editMode: boolean = false;
 viewMode:boolean=false;
 title:string ="Add Document Type Configuration";
 fm: FormGroup;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTypeServiceService  ,
    private doctemplateservice:DocumentTemplateServiceService,private cdr: ChangeDetectorRef,
    private toastr: ToastrService, private loader: SpinnerService,private router: Router) {
      
     }
  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    this.getdocumenttypeconfig();
    if(lastSegment=="viewdoctemplate")
    {
   this.viewMode= this.commonsvc.objdoctemplate!=null ? true : false;
   if(this.viewMode)
   {
   this.newdoctemplate=this.commonsvc.objdoctemplate;
   this.title="View Document Template Configuration"
   }
   this.cdr.detectChanges();
  }
  else if(lastSegment=="editdoctemplate")
  {
    this.editMode= this.commonsvc.objdoctemplate!=null ? true : false;
    if(this.editMode)
    {
    this.newdoctemplate=this.commonsvc.objdoctemplate;
    this.title="Edit Document Template Configuration"
    this.cdr.detectChanges();
    }
  }
  }
 getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
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
      doctype.ModifiedBy = "admin";
      doctype.Status = "Pending";
      
      
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
