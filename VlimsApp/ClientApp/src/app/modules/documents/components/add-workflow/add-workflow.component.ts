import { ChangeDetectorRef, Component } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
})

export class AddWorkflowComponent {
  title:string='New Workflow Configuration';
  workflow = new workflowconiguration();
  grid:workflowconiguration[]=[]
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
  id:number=0; editMode:boolean=false;viewMode:boolean=false;
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

  

  

  constructor(private toastr: ToastrService,
    private location: Location,
    private router: Router,
    private loader:NgxSpinnerService,
    private deptsvc:DepartmentconfigurationService,
    private doctypesvc:DocumentTypeServiceService,
    private userssvc:UsersconfigurationService,
    private usergroupsvc:usergroupconfigurationService,
    private workflowsvc:WorkflowServiceService,
    private commonsvc:CommonService,
    private cdr: ChangeDetectorRef
  ) {}
ngOnInit(){
  
  const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    //default
    this.getdepartments();
    this.getdocumenttypeconfig();
    this.getusers();
    this.getallworkflows();
    //this.getusergroupInfo();

if(lastSegment=="add")
{
 let addcount=parseInt(segments[segments.length - 1],10);
 addcount++;
this.workflow.code="Flow-"+addcount;  
this.workflow.reviewsType='user';
this.workflow.approvalsType='user';
this.workflow.reviewsCount=0;
this.workflow.approvalsCount=0;
}
else if(lastSegment=="edit")
{
  this.title='Modify Workflow Configuration';
  this.editMode=true;
    this.id=parseInt(segments[segments.length-1],10);
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
      this.getbyId(this.id);
}
else if(lastSegment=="view")
{
  this.viewMode=true;
  this.title='View Document Template';
    let id=segments[segments.length-1];
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
    if(this.users.length>0)
    {
      const rev = this.users.filter(user => this.workflow.reviewers?.some(reviewer => reviewer.UCFId === user.UCFId));
      const app = this.users.filter(user => this.workflow.approvals?.some(approver => approver.UCFId === user.UCFId));
      if(rev.length>0 && app.length>0)
      {
        this.workflow.reviewers=rev;
        this.workflow.approvals=app;
      }
    }
      console.log('users',this.users);
      if(this.workflow.reviewers!=null && this.workflow.reviewers!=undefined)
      {
      this.workflow.review=this.workflow.reviewers[0]; 
      }
      if(this.workflow.approvals!=null && this.workflow.approvals!=undefined)
      {
      this.workflow.approve=this.workflow.approvals[0]; 
      }
      console.log('u',this.workflow);
      this.cdr.detectChanges();
    },(error:any)=>{

    })
  }
  addWorkflow(workflow:workflowconiguration) {
    if(this.editMode){
      this.update(workflow);
    }
    else{
      
      if(!this.isduplicate()){
      this.add(workflow);}
    }
  }
  update(workflow: workflowconiguration) {
    
    workflow.ModifiedBy=this.commonsvc.getUsername();
  if(workflow.department!=null)
  {
   workflow.departments= workflow.department.map(o=>o.DepartmentName).join(",");
  }
      return this.workflowsvc.update(workflow).subscribe((data:any)=>{
      this.toastr.success('workflow Updated Succesfull!', 'Updated.!');
      this.location.back();
  });
  }
  getallworkflows() {
    this.loader.show();
      return this.workflowsvc.getworkflow(this.commonsvc.req).subscribe((data: any) => {
        this.grid = data.Response;
        this.commonsvc.templateCount=this.types.length;
        this.loader.hide();
      },((error:any)=>{

      }
      ));
  }
  isduplicate() {
    
    if (this.grid != null && this.grid.length > 0) {
      const type = this.grid.find(p => p.workflowName?.toLocaleLowerCase() == this.workflow.workflowName?.toLocaleLowerCase());
      if (type != null || type != undefined) {
        this.toastr.error('Duplicate Entity');
        this.loader.hide();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
add(workflow:workflowconiguration){
  workflow.CreatedBy=this.commonsvc.getUsername();
  workflow.ModifiedBy=this.commonsvc.getUsername();
  if(workflow.department!=null)
  {
   workflow.departments= workflow.department.map(o=>o.DepartmentName).join(",");
  }
      return this.workflowsvc.addworkflow(workflow).subscribe((data:any)=>{
      //this.loader.hide();
      this.toastr.success('workflow Saved Succesfull!', 'Saved.!');
      this.location.back();
  });
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
   let objrequest: RequestContext={PageNumber:1,PageSize:100,Id:0};
      return this.userssvc.getusers(objrequest).subscribe((data: any) => {
        this.users = data.Response;
        this.loader.hide();
        // if(this.editMode){
        // this.getbyId(this.id);}
      },((error:any)=>{

      }
      ));
  }
  trackByUserId(index: number, user: UserConfiguration) {
    return user.UserID; // Adjust property name as needed
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
  calculateapprovalscount(){
    
    if(this.workflow.approvals!=null || this.workflow.approvals!=undefined)
    {
    this.workflow.approvalsCount = this.workflow.approvals?.length;
    }
  }
  calculatereviewscount(){
    
   
    if(this.workflow.reviewers!=null || this.workflow.reviewers!=undefined)
    {
    this.workflow.reviewsCount = this.workflow.reviewers?.length;
    }
  }
}
