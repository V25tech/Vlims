import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
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
  griddata:DepartmentConfiguration[]=[];
  viewMode: boolean = false;
  departId: number = 0;
   editMode: boolean = false;
   title:string='Add Department Configuration'
  constructor(private commonsvc: CommonService,private toastr: ToastrService, private doctypeservice: DepartmentconfigurationService,
    private router: Router, private cdr: ChangeDetectorRef,
    private loader:NgxSpinnerService,
    private location: Location) { }

  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
     if (lastSegment == "edit") {
      this.title = "Edit Department Configuration"
      this.editMode = true;
      let id=parseInt(segments[segments.length - 1],10);
      this.getbyId(id);
    }
    else if (lastSegment == "view") {
      this.viewMode = true; this.editMode = false;
      this.newdept = this.commonsvc.departConfig;
    }
    else if(lastSegment == "add")
    {

    }
    //this.get();
    this.getdepartments();
    this.cdr.detectChanges();
  }
    getbyId(id:number) {
      
      this.doctypeservice.getbyId(id).subscribe((data: any) => {
        this.newdept = data;
      }, ((error: any) => {

      }));
    }
    // submit(form: NgForm) {
    //   
    //   if (form.valid) {
    //     
    //   }
    // }
  submit(newdept: DepartmentConfiguration) {
    debugger
    if(this.editMode)
    {
      debugger
      this.update(newdept);
    }
    else{
      debugger
      this.adddoctype(newdept);
    }
    
    //this.location.back();
  }
  update(newdept: DepartmentConfiguration) {
    debugger
    this.loader.show();
    newdept.ModifiedBy=this.commonsvc.getUsername();
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
    return this.doctypeservice.update(newdept).subscribe((response)=>{
      this.toastr.success('Department Updated Successfully');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled=false;
    })
  }else{
    return false;
  }
  }
  onCancel() {
    // Reset the DepartmentConfiguration object to clear all fields
    this.newdept = new DepartmentConfiguration();
  }
  adddoctype(newdept: DepartmentConfiguration) {
    debugger
    this.loader.show();
    newdept.CreatedBy = this.commonsvc.getUsername();
    newdept.ModifiedBy = this.commonsvc.getUsername();
    newdept.CreatedDate = new Date();
    newdept.ModifiedDate = new Date();
   if(!this.isduplicate()){
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
    this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
      this.toastr.success('Department added Succesfull!', 'Saved.!');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled=false;
    });
  }
  }
  }
  closepopup() {
    //this.router.navigate(['/admin/department']);
    this.location.back();
  }
  isduplicate() {
    if (this.griddata != null && this.griddata.length > 0) {
      const type = this.griddata.find(p => p.DepartmentName.toLocaleLowerCase() == this.newdept.DepartmentName.toLocaleLowerCase());
      if (type != null || type != undefined) {
        this.toastr.error('Already Exists');
        this.loader.hide();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getdepartments() {
   this.loader.show();
      return this.doctypeservice.getdepartments(this.commonsvc.req).subscribe((data: any) => {
        this.griddata=data.Response;
        this.loader.hide();
      }, er => {
        this.loader.hide();
      });
}
}
