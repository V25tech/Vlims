import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RequestContext, UserConfiguration, Usergroupconfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';
import { usergroupconfigurationService } from './add-usergroupconfiguration.service';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-add-usergroupconfiguration',
  templateUrl: './add-usergroupconfiguration.component.html'
})
export class AddusergroupconfigurationComponent implements OnInit {
  isButtonDisabled = false;
  types: UserConfiguration[] = [];
  newdept= new Usergroupconfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  ugcId: number = 0;
  objname: string | undefined;
  title: string = "New User Group Configuration";
    //usergrp= Usergroupconfiguration;
  constructor(private commonsvc: CommonService, private cdr: ChangeDetectorRef, 
    private ugService: usergroupconfigurationService,private toastr: ToastrService, private userService: UsersconfigurationService,
    private router: Router,private location: Location  ) { }

  ngOnInit() {
    this.getusers();
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    if(lastSegment=="add")
    {
      this.title = "New User Group Configuration"
      let addcount=parseInt(segments[segments.length - 1],10);
     addcount++;
      this.newdept.code="UG-"+addcount;
    }
   else if (lastSegment == "view") {
      this.viewMode = true;
      if (this.viewMode) {
        debugger
        this.objname = this.commonsvc.objname;
        //this.getdocTypeByName(this.objname);
        this.newdept = this.commonsvc.userGroupConfig;
        this.title = "View User Group Configuration"
      }
      this.cdr.detectChanges();
    }
    else if (lastSegment == "edit") {
      this.title = "Modify User Group Configuration"
      this.editMode = true;
      let id=parseInt(segments[segments.length - 1],10);
      this.getbyId(id);
    }
  }
  onCancel() {
    this.location.back();
  }
  submit(newdept: Usergroupconfiguration) {
    debugger
        this.adddoctype(newdept);
    }
    adddoctype(newdept: Usergroupconfiguration) {
      debugger
      newdept.Registeredby="admin";
      newdept.Modify = "admin";
      if(newdept.totalusers=="0"){
        this.toastr.error('select a users');
        return;
      }
      if (this.editMode) {
        if (!this.isButtonDisabled) {
          this.isButtonDisabled = true;
        this.ugService.Updateusergroupconfiguration(newdept).subscribe((res: any) => {
          this.toastr.success('updated successfully');
          this.location.back();
          //this.router.navigate(['/admin/groups/edit/' + newdept.Ugcid]);
          this.isButtonDisabled=false;
        });
      }
      }
      else {
        if (!this.isButtonDisabled) {
          this.isButtonDisabled = true;
        this.ugService.addusergroupconfiguration(newdept).subscribe((res: any) => {
          this.toastr.success('created successfully');
          this.location.back();
          //this.router.navigate(['/admin/groups/edit' + newdept.Ugcid]);
          this.isButtonDisabled=false;
        });
      }
        this.toastr.success('User Group  Saved Succesfull!', 'Saved.!');
      }
    }
    closepopup() {
      this.router.navigate(['/admin/usergroup']);
    }
  getusers() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.userService.getusers(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;      
    });
  }
  getbyId(id:number) {
    debugger
    this.ugService.getbyId(id).subscribe((data: any) => {
      this.newdept = data;
    }, ((error: any) => {

    }));
  }
  calculateTotalUsers(): void {
    if(this.newdept.users!=null || this.newdept.users!=undefined)
    {
    this.newdept.totalusers = this.newdept.users?.length.toString();
    }
  }
}
