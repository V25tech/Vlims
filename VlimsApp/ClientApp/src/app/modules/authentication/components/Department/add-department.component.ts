import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { DepartmentConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html'
  
})
export class AddDepartmentComponent implements OnInit {
  newdept = new DepartmentConfiguration();
  viewMode: boolean = false;
  departId: number = 0;
   editMode: boolean = false;
  constructor(private commonsvc: CommonService, private doctypeservice: DepartmentconfigurationService,
    private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    if (lastSegment == "edit") {
      let id = parseInt(segments[segments.length - 1], 10);
      this.departId = id;
      this.editMode = true; this.viewMode = false;
      this.getbyId();
      //this.documentType=this.commonsvc.documentType;
    }
    else if (lastSegment == "view") {
      this.viewMode = true; this.editMode = false;
      this.newdept = this.commonsvc.departConfig;
    }
    //this.get();
    this.cdr.detectChanges();
  }
    getbyId() {
      debugger
      this.doctypeservice.getbyId(this.departId).subscribe((data: any) => {
        this.newdept = data;
      }, ((error: any) => {

      }));
    }
  submit(newdept: DepartmentConfiguration) {
    debugger
    this.adddoctype(newdept);
  }
  adddoctype(newdept: DepartmentConfiguration) {
    debugger
    newdept.CreatedBy = "admin";
    newdept.ModifiedBy = "admin";

    newdept.CreatedDate = new Date();
    newdept.ModifiedDate = new Date();
    this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
      //this.toastr.success('Added');
      this.router.navigate(['/admin/department']);
    });


  }
  closepopup() {
    this.router.navigate(['/admin/department']);
  }
}
