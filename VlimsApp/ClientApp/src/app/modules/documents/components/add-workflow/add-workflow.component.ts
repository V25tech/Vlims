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
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
})

export class AddWorkflowComponent {
  title:string='New Workflow Configuration';
  workflow = new workflowconiguration();
  types: Array<DocumentTypeConfiguration>=[];
  departs: Array<DepartmentConfiguration>=[];
  usergroups: Array<Usergroupconfiguration> = [];
  users: Array<UserConfiguration> = [];
  selectedreviwers:UserConfiguration[] = [];
  selectedgroupreviwers:Usergroupconfiguration[] = [];
  selectedgroupapprovers:Usergroupconfiguration[] = [];
  selectedapprovers:UserConfiguration[] = [];
  reviewers: { value: string }[] = [{ value: '' }];
  approvers: { value: string }[] = [{ value: '' }];
  departments:string[] | null=[];
  reviwers:string[] | null=null;
  approvals:string[] | null=null;
  reviwersgroup:string| null=null;
  approvalsgroup:string | null=null;
  id:number=0;
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
    private workflowsvc:WorkflowServiceService,
    private commonsvc:CommonService
  ) {}
ngOnInit(){
  const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
  // this.commonsvc.templateCount++;
  // this.workflow.code="Flow-"+this.commonsvc.templateCount;
  

if(lastSegment=="add")
{
 let addcount=parseInt(segments[segments.length - 1],10);
 addcount++;
this.workflow.code="Flow-"+addcount;  
this.getdepartments();
this.getdocumenttypeconfig();
this.getusergroupInfo();
this.getusers();
}
else if(lastSegment=="edit")
{
  this.title='Edit Workflow Configuration';
    this.id=parseInt(segments[segments.length-1],10);
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.usergroupsvc.getusergroupconfiguration(objrequest).subscribe((data:any) => {
      this.usergroups = data.Response;
      console.log('usergroups',this.usergroups)
      this.getdepartments();
      this.getdocumenttypeconfig();
      this.getusers();
      this.getbyId(this.id);
    });
}
else if(lastSegment=="view")
{
  this.title='View Document Template';
    let id=segments[segments.length-1];
    this.getdocumenttypeconfig();
    this.getbyName(id);
}
}
  getbyName(id: string) {
    return this.workflowsvc.getbyName(id).subscribe((data:any)=>{
      this.workflow=data;
    },(error:any)=>{
    })
  }
  getbyId(id: number) {
    return this.workflowsvc.getbyId(id).subscribe((data:any)=>{
      this.workflow=data;
      console.log('u',this.workflow);
    },(error:any)=>{

    })
  }
  addWorkflow(workflow:workflowconiguration) {
    //this.loader.show();
    workflow.CreatedBy=this.commonsvc.createdBy;
    workflow.ModifiedBy=this.commonsvc.createdBy;
    workflow.Status="In-Progress";
    if(workflow.department!=null)
    {
     workflow.departments= workflow.department.map(o=>o.DepartmentName).join(",");
    }
        return this.workflowsvc.addworkflow(workflow).subscribe((data:any)=>{
        //this.loader.hide();
        this.router.navigate(['/workflow']);
    },(error:any)=>{

    })
    console.log(this.reviewers);
  }

  onCancel() {
    //this.workflow.approvalsGroup=this.usergroups[0];
    this.location.back();
  }
  getdepartments() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.deptsvc.getdepartments(objrequest).subscribe((data: any) => {
        
        this.departs = data.Response;
        this.loader.hide();
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
      },((error:any)=>{

      }
      ));
  }
  getusergroupInfo() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.usergroupsvc.getusergroupconfiguration(objrequest).subscribe((data: any) => {
      
      this.usergroups = data.Response;
      //this.workflow.approvalsGroup=this.usergroups[0];
      this.loader.hide();
      //console.log('usergroup',this.usergroups);
    },((error:any)=>{

    }
    ));
  }
}
