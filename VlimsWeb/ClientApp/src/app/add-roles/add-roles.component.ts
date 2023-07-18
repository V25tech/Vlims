import { Component, OnInit } from '@angular/core';
import { DepartmentConfiguration, RequestContext, RoleConfiguration } from '../model/models';
import { RolesconfigurationService } from '../rolesconfiguration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { DepartmentconfigurationService } from '../departmentconfiguration.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {
  addrole = new RoleConfiguration();
  types: Array<DepartmentConfiguration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: RolesconfigurationService,
    private deptservice: DepartmentconfigurationService,
    private router: Router,private toastr: ToastrService,private loader: SpinnerService) { }

    ngOnInit() {
      this.getdepartments();
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
  submit(addrole: RoleConfiguration) {
    debugger
        this.adddoctype(addrole);
    }
    adddoctype(addrole: RoleConfiguration) {
      debugger
      addrole.CreatedBy="admin";
      addrole.ModifiedBy="admin";
      //this.router.navigate(['/products']);
      this.doctypeservice.addrole(addrole).subscribe((res:any)=>{
        this.toastr.success('Added');
        this.router.navigate(['/mainpage/hierarchy/roles']);
      });
    }
    closepopup() {
      this.router.navigate(['/mainpage/hierarchy/roles']);
    }
}
