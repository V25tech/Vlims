import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DepartmentConfiguration, DocumentPreperationConfiguration, DocumentTemplateConfiguration, DocumentTypeConfiguration, RequestContext, workflowconiguration } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentPreperationService } from '../Services/document-preperation.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentTemplateServiceService } from '../Services/document-template-service.service';
import { WorkflowServiceService } from '../Services/workflow-service.service';
import { DocumentRequestService } from '../Services/document-request.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';

@Component({
  selector: 'app-documentprep-add',
  templateUrl: './documentprep-add.component.html',
  styleUrls: ['./documentprep-add.component.css']
})
export class DocumentprepAddComponent implements OnInit {
  adddocreq = new DocumentPreperationConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  title: string = "Add Document Preperation Configuration";
  types: Array<DocumentPreperationConfiguration> = [];
  templates: Array<DocumentTemplateConfiguration> = [];
  workflowTypes: Array<workflowconiguration> = [];
  departs: Array<DepartmentConfiguration> = [];
  selectedFile: File | null = null;
  //editMode: boolean = false;
  //viewMode: boolean = false;
  //title: string = '';
  doctypes: Array<DocumentTypeConfiguration> = [];;
  constructor(private commonsvc: CommonService, private docReqServ: DocumentRequestService, private doctypeserv: DocumentTypeServiceService, private docprepServ: DocumentPreperationService, private deptservice: DepartmentconfigurationService, private workflowserv: WorkflowServiceService, private doctypeservice: DocumentTemplateServiceService, private toastr: ToastrService, private cdr: ChangeDetectorRef, private loader: SpinnerService, private router: Router,) { }
  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    this.GetDocumentInfo();
    this.getdocumenttemplateconfig();
    this.getworkflowtypeconfig();
    this.getdepartments();
    this.getdocumenttypeconfig();
    if (lastSegment == "viewdocprep") {
      this.viewMode = this.commonsvc.docobject != null ? true : false;
      if (this.viewMode) {
        this.adddocreq = this.commonsvc.docPreperation;
        this.title = "View Document Type Configuration"
      }
      this.cdr.detectChanges();
    }
    if (lastSegment == "editdocprep") {
      debugger;
      this.editMode = this.commonsvc.docPreperation != null ? true : false;
      if (this.editMode) {
        this.adddocreq = this.commonsvc.docPreperation;
        this.title = "Edit Document Type Configuration"
        this.cdr.detectChanges();
        this.loader.hide();
      }

      /* $('select').selectpicker();*/
    }
  }
  GetDocumentInfo() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.docReqServ.getdocumentrequest(objrequest).subscribe((data: any) => {

      this.types = data.response;
      this.loader.hide();
      console.log(this.types);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
  submit(adddocreq: DocumentPreperationConfiguration) {
    debugger
    this.addpreprequest(adddocreq);
  }
  addpreprequest(adddocreq: DocumentPreperationConfiguration) {

    adddocreq.CreatedBy = "admin";
    adddocreq.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.docprepServ.ManageDocument(adddocreq).subscribe((res: any) => {
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentpreperation/documprep']);
    });
  }
  closepopup() {
    this.router.navigate(['/mainpage/documentpreperation/documprep']);
  }
  getdocumenttemplateconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeservice.getdocttemplate(objrequest).subscribe((data: any) => {
      debugger
      this.templates = data.Response;
    });
  }
  getworkflowtypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.workflowserv.getworkflow(objrequest).subscribe((data: any) => {
      debugger
      this.workflowTypes = data.Response;
    });
  }
  getdepartments() {

    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      debugger
      this.departs = data.Response;

    });
  }
  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      debugger
      this.doctypes = data.Response;
    });
  }
  onFileSelected(event: any): void {
    debugger
    this.selectedFile = event.target.files[0];
  }
  onUpload(): void {
    debugger
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.docprepServ.upload(formData)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }
}
