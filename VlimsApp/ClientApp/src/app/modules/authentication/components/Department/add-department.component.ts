import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html'
})
export class AddDepartmentComponent implements OnInit {
  isButtonDisabled = false;
  newdept = new DepartmentConfiguration();
  griddata: DepartmentConfiguration[] = [];
  viewMode: boolean = false;
  departId: number = 0;
  editMode: boolean = false;
  title: string = 'Add Department Configuration';
  isDuplicateDeptName: boolean = false; // Flag to track duplicate department name

  constructor(
    private commonsvc: CommonService,
    private toastr: ToastrService,
    private doctypeservice: DepartmentconfigurationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private loader: NgxSpinnerService,
    private location: Location
  ) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];

    if (lastSegment == "edit") {
      this.title = "Edit Department Configuration";
      this.editMode = true;
      let id = parseInt(segments[segments.length - 1], 10);
      this.getbyId(id);
    } else if (lastSegment == "view") {
      this.viewMode = true; 
      this.editMode = false;
      this.newdept = this.commonsvc.departConfig;
    }

    this.getdepartments();
    this.cdr.detectChanges();
  }

  getbyId(id: number) {
    this.doctypeservice.getbyId(id).subscribe((data: any) => {
      this.newdept = data;
    }, (error: any) => {
      // Handle error
    });
  }

  submit(newdept: DepartmentConfiguration) {
    debugger
    if (this.editMode) {
      this.update(newdept);
    } else {
      if (!this.isDuplicateDepartmentCode(newdept.DepartmentCode)) {
        this.adddoctype(newdept);
      } else {
        this.toastr.error('Department Code already exists. Please use a different code.');
      }
    }
  }

  isDuplicateDepartmentCode(departmentCode: string): boolean {
    debugger
    return this.griddata.some(dept => dept.DepartmentCode.toLowerCase() === departmentCode.toLowerCase());
  }

  isDuplicateDepartmentName(departmentName: string): boolean {
    return this.griddata.some(dept => dept.DepartmentName.toLowerCase() === departmentName.toLowerCase());
  }

  update(newdept: DepartmentConfiguration) {
    this.loader.show();
    newdept.ModifiedBy = this.commonsvc.getUsername();
    this.newdept.RevisionNumber++;
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      return this.doctypeservice.update(newdept).subscribe((response) => {
        this.toastr.success('Department Updated Successfully');
        this.loader.hide();
        this.location.back();
        this.isButtonDisabled = false;
      });
    } else {
      return false;
    }
  }

  onCancel() {
    this.location.back();
  }

  adddoctype(newdept: DepartmentConfiguration) {
    this.loader.show();
    newdept.CreatedBy = this.commonsvc.getUsername();
    newdept.ModifiedBy = this.commonsvc.getUsername();
    newdept.CreatedDate = new Date();
    newdept.ModifiedDate = new Date();
    newdept.RevisionNumber = 0;
    
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;

      if (this.isDuplicateDepartmentName(newdept.DepartmentName)) {
        this.toastr.error('Department Name already exists. Please choose a different name.');
        this.loader.hide();
        this.isButtonDisabled = false;
        return;
      }

      this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
        this.toastr.success('Department added successfully!', 'Saved.');
        this.loader.hide();
        this.location.back();
        this.isButtonDisabled = false;
      });
    }
  }

  getdepartments() {
    this.loader.show();
    return this.doctypeservice.getdepartments(this.commonsvc.req).subscribe((data: any) => {
      this.griddata = data.Response;
      this.loader.hide();
    }, error => {
      this.loader.hide();
    });
  }
}
