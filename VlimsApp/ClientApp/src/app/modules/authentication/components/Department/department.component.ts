import { Component, OnInit, ViewChild } from '@angular/core';

import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { DepartmentConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: DepartmentConfiguration[] = [];
  viewMode:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.getdepartments();
  }
getdepartments() {
    //this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getdepartments(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        //this.loader.hide();
        console.log(this.types);
      }, er => {
        //this.toastr.error('loading failed');
        //this.loader.hide();
      });
}
  getStatusClass(status: string): string {
    debugger
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return 'Success';
    }
  }
  navigateToAddDepartment(): void {
    this.router.navigate(['/admin/departments/add']);
  }
  editBrand(doc : DepartmentConfiguration)
  {
    this.router.navigate(['/admin/departments/edit', doc.DPCFId]);
  }
  submit(newdept: DepartmentConfiguration) {
    debugger
    this.adddoctype(newdept);
  }
  adddoctype(newdept: DepartmentConfiguration) {
    debugger
    newdept.CreatedBy = "admin"; this.navigateToAddDepartment
    newdept.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
      //this.toastr.success('Added');
      this.router.navigate(['/admin/department']);
    });


  }
  
}
