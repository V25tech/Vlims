import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentRequestConfiguration, RequestContext } from 'src/app/models/model';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { DocumentRequestService } from 'src/app/modules/services/document-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent {
  departmentsSource = [];
  typeSource = [];
  workflowsSource = [];
  request = new DocumentRequestConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];


  constructor(private router: Router, private location: Location, private spinner: NgxSpinnerService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private documentRequestService: DocumentRequestService) { }

  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if(segments[segments.length-2].toString()=='view')
    {
      this.viewMode=true;
      this.getbyId(parseInt(segments[segments.length-1],10))
    }
    else if (segments.slice(-1).toString() == 'edit' && this.commonsvc.request) {
      this.editMode = true;
      this.request = this.commonsvc.request;
    }
    this.getdepartments();
    this.getdocumenttypeconfig();
    this.getworkflowinfo();
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.documentRequestService.getbyId(arg0).subscribe((data:any)=>{
      this.request=data;
      this.spinner.hide();
      console.log('request',data);
    });
  }
  approve(){
    this.request.status='Approved'
    this.updateRequest();
  }
  reinitiative(){
    this.request.status='Re-Initiated'
    this.updateRequest();
  }
  reject(){
    this.request.status='Rejected'
    this.updateRequest();
  }

  saveRequest() {
    if (this.editMode) {
      this.updateRequest();
    }
    else {
      this.addRequest();
    }
  }

  addRequest() {
    if(!this.viewMode)
    {
    this.request.createdBy = 'admin';
    this.request.modifiedBy = 'admin';
    this.request.status = 'In-Progress';
    this.request.createdDate = new Date().toISOString();
    this.request.modifiedDate = new Date().toISOString();
    this.spinner.show();

    this.documentRequestService.adddocreqconfig(this.request).subscribe(res => {
      this.commonsvc.request = new DocumentRequestConfiguration();
      this.location.back();
      this.spinner.hide();
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }
  }

  updateRequest() {
    this.documentRequestService.updatedocreqconfig(this.request).subscribe(res => {
      this.commonsvc.request = new DocumentRequestConfiguration();
      this.location.back();
      this.spinner.hide();
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }

  onCancel() {
    this.location.back();
  }

  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      this.departmentsSource = data.Response;
    });
  }
  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      this.typeSource = data.Response;
    });
  }
  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsSource = data.Response;
      console.log(this.workflowsSource);
    });
  }

}
