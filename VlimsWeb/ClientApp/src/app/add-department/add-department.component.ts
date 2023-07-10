import { Component, OnInit } from '@angular/core';
import { DepartmentConfiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  newdept = new DepartmentConfiguration();
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService,
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  }
  submit(newdept: DepartmentConfiguration) {
    debugger
        this.adddoctype(newdept);
    }
    adddoctype(newdept: DepartmentConfiguration) {
      debugger
      newdept.CreatedBy="admin";
      newdept.ModifiedBy="admin";
      //this.router.navigate(['/products']);
      this.doctypeservice.adddepartment(newdept).subscribe((res:any)=>{
        this.toastr.success('Added');
        this.router.navigate(['/mainpage/hierarchy']);
      });
      
      
    }
    closepopup() {
      this.router.navigate(['/mainpage/hierarchy']);
    }
}
