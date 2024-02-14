import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { RequestContext, SecurityManagement } from '../../../../models/model';
import { SecuritymanagementService } from '../../../services/securitymanagement.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-securitymgmt',
  templateUrl: './securitymgmt.component.html',
  styleUrls: ['./securitymgmt.component.scss']
})

export class SecuritymgmtComponent {
  types: SecurityManagement[] = [];
  editMode:boolean=false;
  viewMode:boolean=false;
  securityType = new SecurityManagement();
  access:boolean=false;
  isFormSubmitted = false;
  constructor(private Secuypeservice: SecuritymanagementService,private toastr: ToastrService,
     private spinner: NgxSpinnerService, 
     private commonsvc:CommonService,
     
    private router: Router,private location: Location) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.securityConfig ?? false;
    this.getsecuritymanagement();
  }
  onCancel() {
    // Reset the securityType object to clear all fields
    this.securityType = new SecurityManagement();
  }

 
  getsecuritymanagement() {
    debugger;
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 1,
      Id: 0
    };
    return this.Secuypeservice.getsecuritymanagement(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      this.securityType = data.Response[0];
    });
  }
  submit(securityType: SecurityManagement) {
    debugger
    /*if (this.editMode) {*/
    
    this.Secuypeservice.updatesecurityconfiguration(securityType).subscribe((res: any) => {
      this.toastr.success('Security Changes Saved Succesfull!', 'Updated.!');
      this.isFormSubmitted = true;
    });
    
    //}
    //else {
    //  this.adddoctype(doctype);
    //}

  }
  
  
}
