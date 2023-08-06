import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestContext, RequestContext1, WorkItemsConfiguration } from 'src/app/models/model';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.scss'],
})
export class AssignedComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table;
  @ViewChild('paginator') dataPaginator!: Paginator;
  types: Array<WorkItemsConfiguration> = [];
  assignedDatasource = [];
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  constructor(private workitemssvc:WorkitemsService,
    private router:Router,
    private loader:NgxSpinnerService,
    private commonsvc:CommonService) {}

    ngOnInit() {
      this.getworkflowitems();
    }
  getworkflowitems() {
    this.loader.show();
    debugger
    
    const user=localStorage.getItem("username");
    if(user!=null && user!=undefined)
    {
      this.commonsvc.createdBy=user;
    }
    return this.workitemssvc.getworkitems(this.commonsvc.req).subscribe((data: any) => {
      this.types = data.Response;
      if(this.types.length>0)
      {
        debugger
        this.types=this.types.filter(p=>p.InitiatedBy==user);
      }
        if(this.types.length<10)
        this.currentPage=10;
      this.loader.hide();
      console.log('workitems',this.types);
    }, er => {
      // this.toastr.error('loading failed');
      this.loader.hide();
    });

  }
  viewtask(obj:WorkItemsConfiguration)
  {
    debugger
   const tasktype=obj.TaskType;
   const referId=obj.ReferenceId;
   const total=this.types.filter(o=>o.ReferenceId==obj.ReferenceId && o.ActionType==obj.ActionType);

    debugger
    switch (tasktype) {
      case "Type":
        this.router.navigate(['/document-type/view',referId]);
        break;
      case "Template":
        this.router.navigate(['/templates/view',referId]);
        break;
      case "Workflow":
        this.router.navigate(['/mainpage/documentmaster/viewworkflow']);
        break;
      case "Request":
        this.router.navigate(['/requests/view',referId,obj.WITId,'view']);
        //this.router.navigate(['/requests/view',referId]);
        break;
      case "Preparation":
        this.router.navigate(['/preparation/view',referId,obj.WITId,'view']);
        break;
        case "Revision":
        this.router.navigate(['/revision/view/',referId,obj.WITId,'view']);
        break;
        case "Print":
        this.router.navigate(['/print/view/',referId,obj.WITId,'view']);
        break;
      case "Effective":
        this.router.navigate(['/effectives/view/',referId,obj.WITId,'view']);
        break;
      default:
        this.router.navigate(['/mainpage/documentmaster/viewdoctype']);
        break;
    }
    
    console.log('view',referId);
  }
  getStatusClass(status: string): string {
    //const status_ = status.toLowerCase();
    if (status === 'completed') {
      return 'status-completed';
    } else if (status === 'in progress') {
      return 'status-in-progress';
    } else if (status === 'under review') {
      return 'status-under-review';
    }
    else if (status === 'pending') {
      return 'status-pending';
    }
    else if (status === 'APPROVED') {
      return 'status-approved';
    }
    else if (status === 'Approved') {
      return 'status-approved';
    }
     else {
      return '';
    }
  }

}
