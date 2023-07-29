import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RequestContext, UserConfiguration, Usergroupconfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';
import { usergroupconfigurationService } from './add-usergroupconfiguration.service';


@Component({
  selector: 'app-add-usergroupconfiguration',
  templateUrl: './add-usergroupconfiguration.component.html',
  styleUrls: ['./add-usergroupconfiguration.component.css']
})
export class AddusergroupconfigurationComponent implements OnInit {
  types: UserConfiguration[] = [];
  adduser = new Usergroupconfiguration();
  newdept= new Usergroupconfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  objname: string | undefined;
  title: string = "Add User Group Configuration";
  constructor(private commonsvc: CommonService, private cdr: ChangeDetectorRef, private ugService: usergroupconfigurationService, private userService: UsersconfigurationService,
    private router: Router) { }

  ngOnInit() {
    this.getusers();
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    //this.getdepartments();
    //this.getroles();
    debugger
    if (lastSegment == "viewdoctype") {
      this.viewMode = true;
      if (this.viewMode) {
        debugger
        this.objname = this.commonsvc.objname;
        //this.getdocTypeByName(this.objname);
        this.adduser = this.commonsvc.userGroupConfig;
        this.title = "View Document Type Configuration"
      }
      this.cdr.detectChanges();
    }
    else if (lastSegment == "addusergroup") {
      this.editMode = this.commonsvc.userGroupConfig != null ? true : false;
      if (this.editMode) {
        this.newdept = this.commonsvc.userGroupConfig;
        this.title = "Edit User Group Configuration"
        console.log(this.newdept);
        this.cdr.detectChanges();
      }
    }
  }
  submit(newdept: Usergroupconfiguration) {
    debugger
        this.adddoctype(newdept);
    }
    adddoctype(newdept: Usergroupconfiguration) {
      debugger
      newdept.Registeredby="admin";
      newdept.Modify="admin";
      this.ugService.addusergroupconfiguration(newdept).subscribe((res:any)=>{
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
