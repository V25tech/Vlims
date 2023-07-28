import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { RequestContext, SecurityManagement } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { SecuritymanagementService } from '../../../services/securitymanagement.service';

@Component({
  selector: 'app-securitymanagement',
  templateUrl: './securitymanagement.component.html',
  styleUrls: ['./securitymanagement.component.css']
})





export class SecurityManagementComponent implements OnInit {
  types: Array<SecurityManagement> = [];
  securityType: SecurityManagement = new SecurityManagement;
  constructor(private commonsvc: CommonService, private doctypeservice: SecuritymanagementService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.getsecuritymanagement();
  }
  getsecuritymanagement() {
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
}

