import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { RolesconfigurationService } from '../rolesconfiguration.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { RequestContext, RoleConfiguration } from '../model/models';
import { Router } from '@angular/router';

type NewType = SpinnerService;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  types: Array<RoleConfiguration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: RolesconfigurationService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }
  ngOnInit() {
    this.getroles();
  }
  getroles() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:10,Id:0};
      return this.doctypeservice.getroles(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }

}
