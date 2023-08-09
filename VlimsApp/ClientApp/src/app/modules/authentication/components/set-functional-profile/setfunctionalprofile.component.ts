

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestContext, RoleConfiguration, functionalprofile } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { setfunctionalprofileconfigurationservice } from '../../../services/setfunctionalprofile.service';
import { RolesconfigurationService } from 'src/app/modules/services/rolesconfiguration.service';


@Component({
  selector: 'app-setfunctionalprofile',
  templateUrl: './setfunctionalprofile.component.html'
  
})
export class SetfunctionalprofileComponent implements OnInit {
  types: functionalprofile[]=[];
  roleTypes: RoleConfiguration[] = [];
  selectedRoles=new  RoleConfiguration();
  profile=new functionalprofile()
  editMode:boolean=false;
  viewMode:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: RolesconfigurationService ,private setprofileservice: setfunctionalprofileconfigurationservice  ,private router: Router) { }

  ngOnInit() {
    this.getsetfunctionalprofile();
    this.getroles();
  }
getsetfunctionalprofile() {
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.setprofileservice.getsetfunctionalprofileconfiguration(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        console.log(this.types);
      }, er => {
     
      });
  }
  getroles() {
    let objrequest: RequestContext={PageNumber:1,PageSize:10,Id:0};
       return this.doctypeservice.getroles(objrequest).subscribe((data: any) => {
         debugger
         this.roleTypes = data.Response;         
       });
   }
  onSubmit(profileinfo:functionalprofile)
  {   
    debugger;
    profileinfo.role='test';
    profileinfo.createdby='admin';
    profileinfo.modifiedby='admin';
    profileinfo.role=this.selectedRoles.Role;
    this.setprofileservice.addsetfunctionalprofileconfiguration(profileinfo).subscribe((res: any) => {
  });
  }
  onCancel()
  {
    
  }
}
