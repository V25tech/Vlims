import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestContext, SecurityManagement } from '../../../../models/model';
import { SecuritymanagementService } from '../../../services/securitymanagement.service';

@Component({
  selector: 'app-securitymgmt',
  templateUrl: './securitymgmt.component.html',
  styleUrls: ['./securitymgmt.component.scss']
})

export class SecuritymgmtComponent {
  types: SecurityManagement[] = [];
  securityType: SecurityManagement = new SecurityManagement;
  constructor(private doctypeservice: SecuritymanagementService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.getsecuritymanagement();
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
    this.doctypeservice.addsecurityconfiguration(securityType).subscribe((res: any) => {
    });
    //}
    //else {
    //  this.adddoctype(doctype);
    //}

  }
  closepopup() {

  }
}
