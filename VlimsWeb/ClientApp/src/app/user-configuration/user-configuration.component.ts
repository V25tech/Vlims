import { Component, OnInit } from '@angular/core';
import { RequestContext, UserConfiguration } from '../model/models';
import { CommonService } from '../shared/common.service';
import { UsersconfigurationService } from '../usersconfiguration.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

type NewType = SpinnerService;

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
})
export class UserConfigurationComponent implements OnInit {
  types: Array<UserConfiguration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: UsersconfigurationService ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getusers();
  }
  getusers() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getusers(objrequest).subscribe((data: any) => {
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
