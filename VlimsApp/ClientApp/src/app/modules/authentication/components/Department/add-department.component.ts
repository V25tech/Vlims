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

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html'
  
})
export class AddDepartmentComponent implements OnInit {
  newdept = new DepartmentConfiguration();
  griddata:DepartmentConfiguration[]=[];
  viewMode: boolean = false;
  departId: number = 0;
   editMode: boolean = false;
   title:string='Add Department Configuration'
  constructor(private commonsvc: CommonService,private toastr: ToastrService, private doctypeservice: DepartmentconfigurationService,
    private router: Router, private cdr: ChangeDetectorRef,private location: Location) { }

  ngOnInit() {
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
      debugger
      this.doctypeservice.getbyId(id).subscribe((data: any) => {
        this.newdept = data;
      }, ((error: any) => {

      }));
    }
    // submit(form: NgForm) {
    //   debugger
    //   if (form.valid) {
    //     debugger
    //   }
    // }
  submit(newdept: DepartmentConfiguration) {
    debugger
    this.adddoctype(newdept);
    
    this.location.back();
  }
  onCancel() {
    this.location.back();
  }
  adddoctype(newdept: DepartmentConfiguration) {
    debugger
    newdept.CreatedBy = "admin";
    newdept.ModifiedBy = "admin";

    newdept.CreatedDate = new Date();
    newdept.ModifiedDate = new Date();
   if(!this.isduplicate()){
    this.doctypeservice.adddepartment(newdept).subscribe((res: any) => {
      //this.toastr.success('Added');
      this.router.navigate(['/admin/department']);
      this.toastr.success('Department added Succesfull!', 'Saved.!');
    });
  }
  else
  {
    this.toastr.error("Department Already Exist");
  }
  }
  closepopup() {
    this.router.navigate(['/admin/department']);
  }
  isduplicate()
  {
    debugger
    if(this.griddata.length>0)
    {
      let user=this.griddata.find(o=>o.DepartmentName.toLocaleLowerCase()==this.newdept.DepartmentName.toLocaleLowerCase());
    if(user==null || user==undefined)
    {
      return false;
    }
    else return true;
  }
  else return false;
  return true;
  }
  getdepartments() {
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getdepartments(this.commonsvc.req).subscribe((data: any) => {
        debugger
        this.griddata=data.Response;
      }, er => {
      });
}
}
