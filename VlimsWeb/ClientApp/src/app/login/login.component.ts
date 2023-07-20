import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { LoginConfiguration, RequestContext } from '../model/models';
import { LoginServicepage } from '../Services/login1.service';

@Component({
  selector: 'Login-department',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  types: Array<LoginConfiguration> = [];
  constructor(private commonsvc: CommonService, private doctypeservice: LoginServicepage  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getusermanagement();
  }
getusermanagement() {
    this.loader.show();
   let objrequest: RequestContext={
       PageNumber: 1, PageSize: 1,
       Id: 0
   };
      return this.doctypeservice.getlogindetails(objrequest).subscribe((data: any) => {
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
