import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { RequestContext, workflowconiguration } from 'src/app/models/model';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent {
  workflowsDatasource = [];
  types:workflowconiguration[]=[];
  constructor(
    private router: Router,
    private loader:NgxSpinnerService,
    private workflowsvc:WorkflowServiceService,
    private commonsvc:CommonService
  ) {}

  ngOnInit() {
    this.getdocumenttypeconfig();
  }

  navigateToAddWorkflow(): void {
    this.router.navigate(['/workflows/add']);
  }
  getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.workflowsvc.getworkflow(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      },((error:any)=>{

      }
      ));
  }
  editdoc(editband: workflowconiguration) {
    debugger
    this.router.navigate(['/mainpage/documentmaster/editworkflow']);
  }
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else {
      return '';
    }
  }
}
