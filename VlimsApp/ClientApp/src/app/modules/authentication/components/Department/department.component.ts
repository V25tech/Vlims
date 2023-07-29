import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { DepartmentConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
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
    this.router.navigate(['/document-type/add']);
  }
  editBrand(doc : DepartmentConfiguration)
  {
    
  }
  
}
