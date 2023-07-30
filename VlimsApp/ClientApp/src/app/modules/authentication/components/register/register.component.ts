import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentConfiguration, RequestContext, RoleConfiguration, UserConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { RolesconfigurationService } from '../../../services/rolesconfiguration.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';


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
  constructor(private commonsvc: CommonService, private rolesservice: RolesconfigurationService,
    private deptservice: DepartmentconfigurationService,
    private userservice: UsersconfigurationService,
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
      this.editMode = this.commonsvc.userConfig != null ? true : false;
      if (this.editMode) {
        this.adduser = this.commonsvc.userConfig;
        this.title = "Edit User Type Configuration"
        this.cdr.detectChanges();
      }
    }

  }
  submit(adduser: UserConfiguration) {
    debugger
    this.adddoctype(adduser);
  }
  adddoctype(adduser: UserConfiguration) {
    debugger
    adduser.Activedirectory = this.isactivedirectory ? "true" : "false";
    adduser.Standarduser = this.isstandarduser ? "true" : "false";
    adduser.CreatedBy = "admin";
    adduser.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.userservice.adduser(adduser).subscribe((res: any) => {
      this.router.navigate(['/mainpage/users']);
    });


  }
  closepopup() {
    this.router.navigate(['/mainpage/users']);
  }
  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {

    });
  }
  getroles() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.rolesservice.getroles(objrequest).subscribe((data: any) => {
      debugger
      this.roles = data.Response;
      console.log(this.roles);
    }, er => {

    });
  }
  onCancel() {
    this.router.navigate(['/admin/user']);
  }
}

