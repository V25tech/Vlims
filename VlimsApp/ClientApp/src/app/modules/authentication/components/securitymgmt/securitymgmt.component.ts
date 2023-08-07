import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { RequestContext, SecurityManagement } from '../../../../models/model';
import { SecuritymanagementService } from '../../../services/securitymanagement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-securitymgmt',
  templateUrl: './securitymgmt.component.html',
  styleUrls: ['./securitymgmt.component.scss']
})

export class SecuritymgmtComponent {
  types: SecurityManagement[] = [];
  editMode:boolean=false;
  viewMode:boolean=false;
  securityType: SecurityManagement = new SecurityManagement;
  constructor(private doctypeservice: SecuritymanagementService,private toastr: ToastrService, private spinner: NgxSpinnerService, 
    private router: Router,private location: Location) { }

  ngOnInit() {
    this.getsecuritymanagement();
  }
  onCancel() {
    this.location.back();
  }
  getsecuritymanagement() {
    debugger;
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 1,
      Id: 0
    };
    return this.doctypeservice.getsecuritymanagement(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      this.securityType = data.Response[0];
    });
  }
  submit(securityType: SecurityManagement) {
    debugger
    /*if (this.editMode) {*/
    //this.toastr.success('Security Changes Saved Succesfull!', 'Saved.!');
    this.doctypeservice.addsecurityconfiguration(securityType).subscribe((res: any) => {
    });
    //}
    //else {
    //  this.adddoctype(doctype);
    //}

  }
  
  
}
