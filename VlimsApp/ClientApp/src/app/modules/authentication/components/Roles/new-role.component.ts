import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentConfiguration, RequestContext, RoleConfiguration, UserConfiguration } from 'src/app/models/model';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { RolesconfigurationService } from 'src/app/modules/services/rolesconfiguration.service';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html'

})
export class AddRoleComponent implements OnInit {
  isButtonDisabled = false;
  addrole = new RoleConfiguration();
  griddata:RoleConfiguration[]=[];
  editMode: boolean = false;
  viewMode: boolean = false;
  objname: string | undefined;
  roleid: number = 0;
  types: DepartmentConfiguration[] = [];
  roles: RoleConfiguration[] = [];
  isactivedirectory: boolean = false;
  isstandarduser: boolean = false;
  title: string = "New Role Registration";
  constructor(private commonsvc: CommonService,private toastr: ToastrService,
     private rolesservice: RolesconfigurationService,
    private deptservice: DepartmentconfigurationService,
    private userservice: UsersconfigurationService,
    private loader:NgxSpinnerService,
    private router: Router, private cdr: ChangeDetectorRef,private location: Location) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    
    //this.getroles();
    
    if (lastSegment == "view") {
      this.viewMode = true;
      if (this.viewMode) {
        
        this.objname = this.commonsvc.objname;
        //this.getdocTypeByName(this.objname);
        this.addrole = this.commonsvc.roleConfig;
        this.title = "View Role Configuration"
      }
      this.cdr.detectChanges();
    }
    else if (lastSegment == "edit") {
      this.editMode = true;
      this.title = "Modify Role"
      this.roleid=parseInt(segments[segments.length-1],10);
    }
    this.getdepartments();
    this.getroles();
  }
  
  submit(addrole: RoleConfiguration) {
    if(this.editMode)
    {
      this.update(addrole);
    }
    else{
      if(!this.isduplicate()){
    this.adddoctype(addrole);
      }
    }
  }
  update(addrole: RoleConfiguration) {
    addrole.ModifiedBy=this.commonsvc.getUsername();
   this.loader.show();
   if (!this.isButtonDisabled) {
    this.isButtonDisabled = true;
    this.rolesservice.Updaterole(addrole).subscribe((res: any) => {
      this.toastr.success('Role Updated Succesfull!', 'Updated.!');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled=false;
    });
  }
  }
  adddoctype(adaddrole: RoleConfiguration) {
   this.loader.show();
    adaddrole.CreatedBy =this.commonsvc.getUsername();
    adaddrole.ModifiedBy = this.commonsvc.getUsername();
    adaddrole.CreatedDate = new Date();
    adaddrole.ModifiedDate = new Date();
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
    this.rolesservice.addrole(adaddrole).subscribe((data:any)=>{
      this.toastr.success('New Role Saved Succesfull!', 'Saved.!');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled=false;
    });
  }
  }
  closepopup() {
    this.router.navigate(['/mainpage/roles']);
  }
  isduplicate() {
    if (this.griddata != null && this.griddata.length > 0) {
      const type = this.griddata.find(p => p.Role.toLocaleLowerCase() == this.addrole.Role.toLocaleLowerCase());
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
  getroles() {
    this.loader.show();
      return this.rolesservice.getroles(this.commonsvc.req).subscribe((data: any) => {
        this.griddata = data.Response;
        this.loader.hide();
      }, er => {
        this.loader.hide();
      });
  }
  getdepartments() {
    return this.deptservice.getdepartments(this.commonsvc.req).subscribe((data: any) => {
      this.types = data.Response;
console.log('dept',this.types);
     if(this.editMode)
     {
      this.getbyId(this.roleid);
     }
    }, er => {
    });
  }
  onCancel() {
    // Reset the addrole object to clear all fields
    this.addrole = new RoleConfiguration();
  }
  getbyId(id:number) {
    
    this.rolesservice.getbyId(id).subscribe((data: any) => {
      this.addrole = data;
      this.cdr.detectChanges();
      console.log('role',this.addrole);
    }, ((error: any) => {

    }));
  }
}
