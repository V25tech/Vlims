import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { WorkflowServiceService } from '../Services/workflow-service.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { RequestContext, workflowconiguration } from '../model/models';

@Component({
  selector: 'app-workflow-config',
  templateUrl: './workflow-config.component.html',
  styleUrls: ['./workflow-config.component.css']
})
export class WorkflowConfigComponent implements OnInit {
  types: Array<workflowconiguration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: WorkflowServiceService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getdocumenttypeconfig();
  }
  getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getworkflow(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
  editdoc(editband: workflowconiguration) {
    debugger
    this.commonsvc.objworkflow=editband;
    this.router.navigate(['/mainpage/documentmaster/editworkflow']);
  }
}
