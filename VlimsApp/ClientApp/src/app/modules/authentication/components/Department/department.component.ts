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
  currentPage = 0;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: DepartmentConfiguration[] = [];
  viewMode:boolean=false;
  access:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService, private loader: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.deptConfig ?? false;
    this.getdepartments();
  }
getdepartments() {
    this.loader.show();
      return this.doctypeservice.getdepartments(this.commonsvc.req).subscribe((data: any) => {
        if(data!=null&&data.Response!=null&&data.Response.length>0){
          data.Response.forEach((item:any)=>{
            item.ModifiedDate=this.commonsvc.setDate(item.ModifiedDate)
          })
          this.types = data.Response;
         } 
        // this.types = data.Response;
        this.loader.hide();
      });
}
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    }else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    }else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return 'Success';
    }
  }
  navigateToAddDepartment(): void {
    this.router.navigate(['/admin/hierarchy/departments/add']);
  }
  editBrand(doc : DepartmentConfiguration)
  {
    this.router.navigate(['/admin/hierarchy/departments/edit', doc.DPCFId]);
  }
  submit(newdept: DepartmentConfiguration) {
    
    this.adddoctype(newdept);
  }
  adddoctype(newdept: DepartmentConfiguration) {
    
    newdept.CreatedBy = this.commonsvc.getUsername(); this.navigateToAddDepartment
    newdept.ModifiedBy = this.commonsvc.getUsername();
    //this.router.navigate(['/products']);
    this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
      //this.toastr.success('Added');
      this.router.navigate(['/admin/department']);
    });


  }
  
}
