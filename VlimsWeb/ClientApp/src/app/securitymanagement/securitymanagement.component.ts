import { Component, OnInit } from '@angular/core';
import { SecurityManagement, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { SecuritymanagementService } from '../Services/securitymanagement.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-securitymanagement',
  templateUrl: './securitymanagement.component.html',
  styleUrls: ['./securitymanagement.component.css']
})





export class SecurityManagementComponent implements OnInit {
  types: Array<SecurityManagement> = [];
  securityType: SecurityManagement;
  constructor(private commonsvc: CommonService, private doctypeservice: SecuritymanagementService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    this.getsecuritymanagement();
  }
  getsecuritymanagement() {
    this.loader.show();
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 1,
      Id: 0
    };
    return this.doctypeservice.getsecuritymanagement(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      this.securityType = data.Response[0];
      this.loader.hide();
      console.log(this.types);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
  submit(securityType: SecurityManagement) {
    debugger
    /*if (this.editMode) {*/
    this.doctypeservice.addsecurityconfiguration(securityType).subscribe((res: any) => {
        this.toastr.success('Updated');
      });
    //}
    //else {
    //  this.adddoctype(doctype);
    //}

  }
}

