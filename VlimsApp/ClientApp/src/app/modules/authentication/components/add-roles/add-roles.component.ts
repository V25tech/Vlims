import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentConfiguration, RequestContext, RoleConfiguration } from '../../../../models/model';
import { DepartmentconfigurationService } from '../../../services/departmentconfiguration.service';
import { RolesconfigurationService } from '../../../services/rolesconfiguration.service';
import { CommonService } from '../../../../shared/common.service';

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
    private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.getdepartments();
    }
  getdepartments() {
     let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
        return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
          debugger
          this.types = data.Response;         
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
        this.router.navigate(['/mainpage/hierarchy/roles']);
      });
    }
    closepopup() {
      this.router.navigate(['/mainpage/hierarchy/roles']);
    }
}
