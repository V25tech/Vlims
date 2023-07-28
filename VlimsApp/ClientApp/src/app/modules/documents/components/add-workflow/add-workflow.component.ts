import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Workflow } from '../../models/workflows';
import { Router } from '@angular/router';
import { DepartmentConfiguration, DocumentTypeConfiguration, RequestContext, UserConfiguration, Usergroupconfiguration, workflowconiguration } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { usergroupconfigurationService } from 'src/app/modules/services/add-usergroupconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
})
export class AddWorkflowComponent {
  workflow = new workflowconiguration();
  types: Array<DocumentTypeConfiguration>=[];
  departs: Array<DepartmentConfiguration>=[];
  usergroups: Array<usergroupconfigurationService> = [];
  users: Array<UserConfiguration> = [];
  selectedreviwers:UserConfiguration[] = [];
  selectedgroupreviwers:Usergroupconfiguration[] = [];
  selectedgroupapprovers:Usergroupconfiguration[] = [];
  selectedapprovers:UserConfiguration[] = [];
  reviewers: { value: string }[] = [{ value: '' }];
  approvers: { value: string }[] = [{ value: '' }];

  addReviewer() {
    this.reviewers.push({ value: '' });
  }

  removeReviewer(index: number) {
    this.reviewers.splice(index, 1);
  }

  addApprover() {
    this.approvers.push({ value: '' });
  }

  removeApprover(index: number) {
    this.approvers.splice(index, 1);
  }



  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Preparation', value: 'Preparation' },
    { label: 'Validating', value: 'Validating' },
    { label: 'Excuting', value: 'Excuting' },
    { label: 'Approval', value: 'Approval' },
  ];

  

  

  constructor(
    private location: Location,
    private router: Router,
    private loader:NgxSpinnerService,
    private deptsvc:DepartmentconfigurationService,
    private doctypesvc:DocumentTypeServiceService,
    private userssvc:UsersconfigurationService,
    private usergroupsvc:usergroupconfigurationService,
    private commonsvc:CommonService
  ) {}
ngOnInit(){
  this.commonsvc.templateCount++;
  this.workflow.code="Flow-"+this.commonsvc.templateCount;
  this.getdepartments();
this.getdocumenttypeconfig();
this.getusergroupInfo();
this.getusers();
}
  addWorkflow(workflow:workflowconiguration) {
    debugger
    this.reviewers.map(reviewer => reviewer.value)
    console.log(this.reviewers);
  }

  onCancel() {
    this.location.back();
  }
  getdepartments() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.deptsvc.getdepartments(objrequest).subscribe((data: any) => {
        
        this.departs = data.Response;
        this.loader.hide();
        console.log(this.departs);
      },((error:any)=>{

      }
      ));
  }
 getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypesvc.getdoctypeconfig(objrequest).subscribe((data: any) => {
        
        this.types = data.Response;
        
        this.loader.hide();
        console.log(this.types);
      },((error:any)=>{

      }
      ));
  }
  getusers() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.userssvc.getusers(objrequest).subscribe((data: any) => {
        
        this.users = data.Response;
        this.loader.hide();
        console.log(this.users);
      },((error:any)=>{

      }
      ));
  }
  getusergroupInfo() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.usergroupsvc.getusergroupconfiguration(objrequest).subscribe((data: any) => {
      debugger
      this.usergroups = data.Response;
      this.loader.hide();
      console.log(this.usergroups);
    },((error:any)=>{

    }
    ));
  }
}
