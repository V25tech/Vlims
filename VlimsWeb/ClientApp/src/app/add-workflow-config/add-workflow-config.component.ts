import { Component, OnInit } from '@angular/core';
import { DocumentTypeConfiguration, RequestContext, workflowconiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WorkflowServiceService } from '../Services/workflow-service.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-add-workflow-config',
  templateUrl: './add-workflow-config.component.html',
  styleUrls: ['./add-workflow-config.component.css']
})
export class AddWorkflowConfigComponent implements OnInit {
  addworkflow = new workflowconiguration();
  doctypes: Array<DocumentTypeConfiguration>=[];
  constructor(private commonsvc: CommonService, private workflowservice: WorkflowServiceService,
    private doctypeservice: DocumentTypeServiceService ,private loader: SpinnerService,
    private router: Router,private toastr: ToastrService) { }

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
