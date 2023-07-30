import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DepartmentConfiguration, RequestContext, RoleConfiguration, UserConfiguration } from 'src/app/models/model';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { RolesconfigurationService } from 'src/app/modules/services/rolesconfiguration.service';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html'

})
export class AddRoleComponent implements OnInit {
  addrole = new RoleConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  objname: string | undefined;
  types: DepartmentConfiguration[] = [];
  roles: RoleConfiguration[] = [];
  isactivedirectory: boolean = false;
  isstandarduser: boolean = false;
  title: string = "Add Role Configuration";
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
        this.addrole = this.commonsvc.roleConfig;
        this.title = "View Document Type Configuration"
      }
      this.cdr.detectChanges();
    }
    else if (lastSegment == "edit") {
      this.editMode = this.commonsvc.roleConfig != null ? true : false;
      if (this.editMode) {
        this.addrole = this.commonsvc.roleConfig;
        this.title = "Edit User Type Configuration"
        this.cdr.detectChanges();
      }
    }

  }
  submit(addrole: RoleConfiguration) {
    debugger
    this.adddoctype(addrole);
  }
  adddoctype(adaddrole: RoleConfiguration) {
    debugger;
    adaddrole.CreatedBy = "admin";
    adaddrole.ModifiedBy = "admin";
    adaddrole.CreatedDate = new Date();
    adaddrole.ModifiedDate = new Date();
    //this.router.navigate(['/products']);
    this.rolesservice.addrole(adaddrole).subscribe((res: any) => {
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

  }
}
