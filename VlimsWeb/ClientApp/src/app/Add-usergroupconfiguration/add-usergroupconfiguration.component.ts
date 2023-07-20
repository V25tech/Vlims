import { Component, OnInit } from '@angular/core';
import { RequestContext, UserConfiguration, Usergroupconfiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';
import { usergroupconfigurationService } from '../Services/usergroupconfiguration.service';
import { UsersconfigurationService } from '../usersconfiguration.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-usergroupconfiguration',
  templateUrl: './add-usergroupconfiguration.component.html',
  styleUrls: ['./add-usergroupconfiguration.component.css']
})
export class AddusergroupconfigurationComponent implements OnInit {
  types: Array<UserConfiguration> = [];
  newdept = new Usergroupconfiguration();
  constructor(private commonsvc: CommonService, private ugService: usergroupconfigurationService, private userService: UsersconfigurationService,
    private router: Router) { }

  ngOnInit() {
    this.getusers();
  }
  submit(newdept: Usergroupconfiguration) {
    debugger
        this.adddoctype(newdept);
    }
    adddoctype(newdept: Usergroupconfiguration) {
      debugger
      newdept.Registeredby="admin";
      newdept.Modify="admin";
      //this.router.navigate(['/products']);
      this.ugService.addusergroupconfiguration(newdept).subscribe((res:any)=>{
      //  this.toastr.success('Added');
        this.router.navigate(['/mainpage/users/usergrp']);
      });
      
      
    }
    closepopup() {
      this.router.navigate(['/mainpage/users/usergrp']);
    }
  getusers() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.userService.getusers(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;      
    });
  }
}
