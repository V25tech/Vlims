import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentConfiguration, RequestContext, RoleConfiguration, UserConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { RolesconfigurationService } from '../../../services/rolesconfiguration.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  adduser = new UserConfiguration();
  //newuser = new UserConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  //objname: string;
  types: DepartmentConfiguration[] = [];
  roles: RoleConfiguration[] = [];
  isactivedirectory: boolean = false;
  isstandarduser: boolean = false;
  title: string = "Add User Configuration";
  objname: string = '';
  userid:string='';
  constructor(private commonsvc: CommonService, private rolesservice: RolesconfigurationService,
    private deptservice: DepartmentconfigurationService,
    private userservice: UsersconfigurationService,
    private location: Location,
    private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    this.getdepartments();
    this.getroles();
    debugger
    if (lastSegment == "view") {
      this.viewMode = true;
      if (this.viewMode) {
        debugger
        this.objname = this.commonsvc.objname;
        //this.getdocTypeByName(this.objname);
        this.adduser = this.commonsvc.userConfig;
        this.title = "View Document Type Configuration"
      }
      this.cdr.detectChanges();
    }
    else if (lastSegment == "edit") {
      this.editMode = true;
      this.userid=segments[segments.length - 1];
      this.getbyId();
    }

  }
  submit(adduser: UserConfiguration) {
    debugger
    this.adddoctype(adduser);
  }
  adddoctype(adduser: UserConfiguration) {
    debugger
    if(!this.editMode)
    {
    adduser.Activedirectory = this.isactivedirectory ? "true" : "false";
    adduser.Standarduser = this.isstandarduser ? "true" : "false";
    adduser.CreatedBy = "admin";
    adduser.ModifiedBy = "admin";
    adduser.CreatedDate=new Date();
    adduser.ModifiedDate=new Date();
    //this.router.navigate(['/products']);
    this.userservice.adduser(adduser).subscribe((res: any) => {
      this.location.back();
    });
  }
  else
  { 
    this.userservice.update(adduser).subscribe((data:any)=>{
      this.location.back();
    });

  }
  }
  getbyId()
  {
    return this.userservice.getbyId(this.userid).subscribe((data:any)=>{
      this.adduser=data;
    });
  }
  closepopup() {
    this.router.navigate(['/mainpage/users']);
  }
  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {

    });
  }
  getroles() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.rolesservice.getroles(objrequest).subscribe((data: any) => {
      debugger
      this.roles = data.Response;
      console.log(this.roles);
    }, er => {

    });
  }
  onCancel() {
    this.router.navigate(['/admin/users']);
  }
  calculateTotalUsers(): void {
    if(this.adduser.FirstName!=null || this.adduser.LastName!=null)
    {
    this.adduser.UserID = this.adduser.FirstName+this.adduser.LastName;
    }
  }
}

