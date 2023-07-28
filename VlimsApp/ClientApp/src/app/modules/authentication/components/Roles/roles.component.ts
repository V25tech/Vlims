import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RequestContext, RoleConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { RolesconfigurationService } from '../../../services/rolesconfiguration.service';

//type NewType = SpinnerService;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  types: RoleConfiguration[]=[];
  constructor(private commonsvc: CommonService, private doctypeservice: RolesconfigurationService  ,private router: Router) { }
  ngOnInit() {
    this.getroles();
  }
  getroles() {
   // this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:10,Id:0};
      return this.doctypeservice.getroles(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        //this.loader.hide();
        console.log(this.types);
      }, (er: any) => {
        //this.toastr.error('loading failed');
        //this.loader.hide();
      });
  }

}
