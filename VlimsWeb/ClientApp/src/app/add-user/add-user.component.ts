import { Component, OnInit } from '@angular/core';
import { DepartmentConfiguration, RequestContext, RoleConfiguration, UserConfiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { RolesconfigurationService } from '../rolesconfiguration.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { UsersconfigurationService } from '../usersconfiguration.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  adduser = new UserConfiguration();
  types: Array<DepartmentConfiguration>=[];
  roles: Array<RoleConfiguration>=[];
  isactivedirectory : boolean=false;
  isstandarduser : boolean=false;
  constructor(private commonsvc: CommonService, private rolesservice: RolesconfigurationService,
    private deptservice: DepartmentconfigurationService,
    private userservice: UsersconfigurationService,
    private router: Router,private toastr: ToastrService,private loader: SpinnerService) { }

    ngOnInit() {
      this.getdepartments();
      this.getroles();
    }
    submit(adduser: UserConfiguration) {
      debugger
          this.adddoctype(adduser);
      }
      adddoctype(adduser: UserConfiguration) {
        debugger
        adduser.Activedirectory=this.isactivedirectory ? "true" : "false" ;
        adduser.Standarduser=this.isstandarduser ? "true" : "false" ;
        adduser.CreatedBy="admin";
        adduser.ModifiedBy="admin";
        //this.router.navigate(['/products']);
        this.userservice.adduser(adduser).subscribe((res:any)=>{
          this.toastr.success('Added');
          this.router.navigate(['/mainpage/users']);
        });
        
        
      }
      closepopup() {
        this.router.navigate(['/mainpage/users']);
      }
  getdepartments() {
      this.loader.show();
     let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
        return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
          debugger
          this.types = data.Response;
          this.loader.hide();
          console.log(this.types);
        }, er => {
          this.toastr.error('loading failed');
          this.loader.hide();
        });
    }
    getroles() {
      this.loader.show();
     let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
        return this.rolesservice.getroles(objrequest).subscribe((data: any) => {
          debugger
          this.roles = data.Response;
          this.loader.hide();
          console.log(this.roles);
        }, er => {
          this.toastr.error('loading failed');
          this.loader.hide();
        });
    }
}
