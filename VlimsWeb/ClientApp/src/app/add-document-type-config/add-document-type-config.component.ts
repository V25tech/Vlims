import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DepartmentConfiguration, DocumentTypeConfiguration, RequestContext } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { SpinnerService } from '../spinner/spinner.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';


//declare var $: any;

@Component({
  selector: 'app-add-document-type-config',
  templateUrl: './add-document-type-config.component.html',
  styleUrls: ['./add-document-type-config.component.css']
})
export class AddDocumentTypeConfigComponent implements OnInit {
 adddoc = new DocumentTypeConfiguration();
 editMode: boolean = false;
 viewMode:boolean=false;
 objname:string;
 types: Array<DepartmentConfiguration>=[];
 title:string ="Add Document Type Configuration";
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTypeServiceService,
    private cdr: ChangeDetectorRef,private loader: SpinnerService,private deptservice: DepartmentconfigurationService,
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    this.getdepartments();
    
    if(lastSegment=="viewdoctype")
    {
   this.viewMode= true;
   if(this.viewMode)
   {
    debugger
    this.objname=this.commonsvc.objname;
    this.getdocTypeByName(this.objname);
  //  this.adddoc=this.commonsvc.docobject;
   this.title="View Document Type Configuration"
   }
   this.cdr.detectChanges();
  }
  else if(lastSegment=="editdoctype")
  {
    this.editMode= this.commonsvc.docobject!=null ? true : false;
    if(this.editMode)
    {
    this.adddoc=this.commonsvc.docobject;
    this.title="Edit Document Type Configuration"
    this.cdr.detectChanges();
    }
  }
  }
  getdocTypeByName(objname:string)
  {
    this.loader.show();
    debugger
      return this.doctypeservice.getdoctypeconfigbyname(objname).subscribe((data:any)=>{
        debugger
        this.adddoc=data;
        this.loader.hide();
        console.log(this.adddoc);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
  getdepartments() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
  submit(doctype: DocumentTypeConfiguration) {
  debugger
    if(this.editMode)
    {
      doctype.Status="Pending";
      this.doctypeservice.updatedoctypeconfig(doctype).subscribe((res:any)=>{
        this.toastr.success('Updated');
        this.router.navigate(['/mainpage/documentmaster']);
      });
    }
    else{
      this.adddoctype(doctype);
    }
    
  }
  adddoctype(doctype: DocumentTypeConfiguration) {
    debugger
    doctype.CreatedBy="admin";
    doctype.ModifiedBy = "admin";
    // const format = 'dd/MM/yyyy';
    // const locale = 'en-US';
    // const formattedDate = formatDate(doctype.CreatedDate, format, locale);
    // doctype.CreatedDate = formattedDate;
    this.doctypeservice.adddoctypeconfig(doctype).subscribe((res:any)=>{
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentmaster']);
    });
    
    
  }
  closepopup() {
    if(this.viewMode)
    {
      this.router.navigate(['/mainpage/workitems']);
    }
    else
    {
    this.router.navigate(['/mainpage/documentmaster']);
    }
  }
}
