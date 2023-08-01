import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestContext, WorkItemsConfiguration } from 'src/app/models/model';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

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
    private loader:NgxSpinnerService) {}

    ngOnInit() {
      this.getworkflowitems();
    }
  getworkflowitems() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 500, Id: 0 };
    return this.workitemssvc.getworkitems(objrequest).subscribe((data: any) => {
      this.types = data.Response;
      this.loader.hide();
      console.log('workitems',this.types);
    }, er => {
      // this.toastr.error('loading failed');
      this.loader.hide();
    });

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
     else {
      return '';
    }
  }

}
