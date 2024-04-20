import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { RequestContext, workflowconiguration } from 'src/app/models/model';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  docTypesDatasource = [];
  workflowsDatasource = [];
  types:workflowconiguration[]=[];
  access:boolean=false;
  constructor(
    private router: Router,
    private loader:NgxSpinnerService,
    private workflowsvc:WorkflowServiceService,
    private commonsvc:CommonService
  ) {}

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.workflowConfig ?? false;
    this.getdocumenttypeconfig();
  }

  navigateToAddWorkflow(): void {
    this.router.navigate(['/workflows/add',this.types.length]);
  }
  getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
      return this.workflowsvc.getworkflow(objrequest).subscribe((data: any) => {
        if(data!=null&&data.Response!=null&&data.Response.length>0){
          data.Response.forEach((item:any)=>{
            item.CreatedDate=this.commonsvc.setDate(item.CreatedDate)
          })
         } 
        this.types = data.Response;
        this.commonsvc.templateCount=this.types.length;
        if(this.types.length<10)
        {
          this.currentPage=10;
        }
        this.loader.hide();
      },((error:any)=>{

      }
      ));
  }
  editdoc(editband: workflowconiguration) {
    
    //this.router.navigate(['/templates/view',editband.Templatename]);
    this.router.navigate(['/workflows/edit',editband.WFCId]);
  }
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    }else if (status === 'Under Review') {
      return 'status-under-review';
    } else {
      return '';
    }
  }
}
