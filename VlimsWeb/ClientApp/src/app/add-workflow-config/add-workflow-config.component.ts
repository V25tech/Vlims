import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import { DepartmentConfiguration, DocumentTypeConfiguration, RequestContext, workflowconiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WorkflowServiceService } from '../Services/workflow-service.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { SpinnerService } from '../spinner/spinner.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';

@Component({
  selector: 'app-add-workflow-config',
  templateUrl: './add-workflow-config.component.html',
  styleUrls: ['./add-workflow-config.component.css']
})
export class AddWorkflowConfigComponent implements OnInit {
  addworkflow = new workflowconiguration();
  types: Array<DocumentTypeConfiguration>=[];
  departs: Array<DepartmentConfiguration>=[];
  editMode: boolean = false;
 viewMode:boolean=false;
 title:string ="Add Workflow Configuration";
  constructor(private commonsvc: CommonService, private workflowservice: WorkflowServiceService,
    private deptservice: DepartmentconfigurationService,
    private doctypeservice: DocumentTypeServiceService ,private loader: SpinnerService,private cdr: ChangeDetectorRef,
    private router: Router,private toastr: ToastrService) { }

    ngOnInit() {
      debugger
      const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
      this.getdocumenttypeconfig();
      this.getdepartments();
      if(lastSegment=="viewworkflow")
      {
     this.viewMode= this.commonsvc.objworkflow!=null ? true : false;
     if(this.viewMode)
     {
     this.addworkflow=this.commonsvc.objworkflow;
     this.title="View Workflow Configuration"
     }
     this.cdr.detectChanges();
    }
    else if(lastSegment=="editworkflow")
  {
    this.editMode= this.commonsvc.objworkflow!=null ? true : false;
    if(this.editMode)
    {
    this.addworkflow=this.commonsvc.objworkflow;
    this.title="Edit Workflow Configuration"
    this.cdr.detectChanges();
    }
  }
    }
    getdepartments() {
      this.loader.show();
     let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
        return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
          debugger
          this.departs = data.Response;
          this.loader.hide();
          console.log(this.departs);
        }, er => {
          this.toastr.error('loading failed');
          this.loader.hide();
        });
    }
   getdocumenttypeconfig() {
      this.loader.show();
     let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
        return this.doctypeservice.getdoctypeconfig(objrequest).subscribe((data: any) => {
          debugger
          this.types = data.Response;
          debugger
          this.loader.hide();
          console.log(this.types);
        }, er => {
          this.toastr.error('loading failed');
          this.loader.hide();
        });
    }
  submit(addworkflow: workflowconiguration) {
    debugger
      
        this.adddoctype(addworkflow);
      
    }
    adddoctype(addworkflow: workflowconiguration) {
      debugger
      addworkflow.CreatedBy="admin";
      addworkflow.ModifiedBy="admin";
      //this.router.navigate(['/products']);
      this.workflowservice.addworkflow(addworkflow).subscribe((res:any)=>{
        this.toastr.success('Added');
        this.router.navigate(['/mainpage/documentmaster/workflow']);
      });
      
      
    }
    closepopup() {
      this.router.navigate(['/mainpage/documentmaster/workflow']);
    }
}
