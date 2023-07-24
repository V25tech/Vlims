import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DepartmentConfiguration, DocumentEffectiveConfiguration, DocumentTypeConfiguration, RequestContext, workflowconiguration } from '../model/models';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DocumentPreperationService } from '../Services/document-preperation.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentTemplateServiceService } from '../Services/document-template-service.service';
import { WorkflowServiceService } from '../Services/workflow-service.service';
import { debug } from 'util';
import { DocumentEffectiveService } from '../Services/document-effective.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';

@Component({
  selector: 'app-document-effective-edit',
  templateUrl: './document-effective-edit.component.html',
  styleUrls: ['./document-effective-edit.component.css']
})
export class DocumentEffectiveEditComponent implements OnInit {
  adddocreq = new DocumentEffectiveConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  title: string = "Document Effective Configuration";
  types: Array<DocumentEffectiveConfiguration> = [];
  templates: Array<DocumentEffectiveConfiguration> = [];
  workflowTypes: Array<workflowconiguration> = [];
  departs: Array<DepartmentConfiguration> = [];
  //editMode: boolean = false;
  //viewMode: boolean = false;
  //title: string = '';
  doctypes: Array<DocumentTypeConfiguration> = [];;
  constructor(private commonsvc: CommonService, private docReqServ: DocumentPreperationService, private doctypeserv: DocumentTypeServiceService, private deptservice: DepartmentconfigurationService, private docEffServ: DocumentEffectiveService, private workflowserv: WorkflowServiceService, private doctypeservice: DocumentTemplateServiceService, private toastr: ToastrService, private cdr: ChangeDetectorRef, private loader: SpinnerService, private router: Router,) { }
  ngOnInit() {
    debugger;
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    this.GetDocumentInfo();
    this.getdocumenttemplateconfig();
    this.getworkflowtypeconfig();
    this.getdepartments();
    this.getdocumenttypeconfig();
    if (lastSegment == "viewdocprep") {
      this.viewMode = this.commonsvc.docEffecConfig != null ? true : false;
      if (this.viewMode) {
        this.adddocreq = this.commonsvc.docEffecConfig;
        this.title = "View Document Type Configuration"
      }
      this.cdr.detectChanges();
    }
    if (lastSegment == "documeffectedit") {
      debugger;
      this.editMode = this.commonsvc.docEffecConfig != null ? true : false;
      if (this.editMode) {
        this.adddocreq = this.commonsvc.docEffecConfig;
        this.title = "Document Type Effective"
        this.cdr.detectChanges();
        this.loader.hide();
      }

      $('select').selectpicker();
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

  closepopup() {
    this.router.navigate(['/mainpage/documentmanager/documeffect']);
  }
  getdocumenttemplateconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.doctypeservice.getdocttemplate(objrequest).subscribe((data: any) => {
      debugger
      this.templates = data.Response;
    });
  }
  getworkflowtypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.workflowserv.getworkflow(objrequest).subscribe((data: any) => {
      debugger
      this.workflowTypes = data.Response;
    });
  }
  submit(adddocreq: DocumentEffectiveConfiguration) {
    debugger
    this.addDocumentEffective(adddocreq);
  }
  addDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {

    adddocreq.CreatedBy = "admin";
    adddocreq.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.docEffServ.ManageDocumentEffective(adddocreq).subscribe((res: any) => {
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentpreperation/documeffect']);
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
  UpdateDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {
    adddocreq.CreatedBy = "admin";
    adddocreq.ModifiedBy = "admin";
    adddocreq.Status = 'In Progress';
    this.docEffServ.UpdateDocumentEffective(adddocreq).subscribe((res: any) => {
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/documentpreperation/documeffect']);
    });
  }
}
