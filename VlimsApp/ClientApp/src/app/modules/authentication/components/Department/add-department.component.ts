import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { DepartmentConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  newdept = new DepartmentConfiguration();
  viewMode:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService,
    private router: Router) { }

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
        //this.toastr.success('Added');
        this.router.navigate(['/mainpage/hierarchy']);
      });
      
      
    }
    closepopup() {
      this.router.navigate(['/mainpage/hierarchy']);
    }
}
