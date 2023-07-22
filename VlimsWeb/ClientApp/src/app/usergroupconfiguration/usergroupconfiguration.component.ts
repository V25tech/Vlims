import { Component, OnInit } from '@angular/core';
import { Usergroupconfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { usergroupconfigurationService } from '../Services/usergroupconfiguration.service';

type NewType = ToastrService;

@Component({
  selector: 'app-usergroupconfiguration',
  templateUrl: './usergroupconfiguration.component.html',
  styleUrls: ['./usergroupconfiguration.component.css']
})
export class UsergroupconfigurationComponent implements OnInit {

  name: string = 'Product Type';
  types: Array<usergroupconfigurationService> = [];
  newtype: usergroupconfigurationService;
  objProductType: Usergroupconfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: usergroupconfigurationService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    this.getusergroupInfo();
  }
  getusergroupInfo() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.doctypeservice.getusergroupconfiguration(objrequest).subscribe((data: any) => {
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
