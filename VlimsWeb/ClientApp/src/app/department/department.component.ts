import { Component, OnInit } from '@angular/core';
import { DepartmentConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  types: Array<DepartmentConfiguration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getdepartments();
  }
getdepartments() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getdepartments(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
}
