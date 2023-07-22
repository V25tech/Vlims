

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { setfunctionalprofileconfigurationservice } from '../Services/setfunctionalprofile.service';
import { RequestContext } from '../model/models';

@Component({
  selector: 'app-functionalprofile',
  templateUrl: './functionalprofile.component.html',
  styleUrls: ['./functionalprofile.component.css']
})
export class SetfunctionalprofileComponent implements OnInit {
  types: Array<setfunctionalprofileconfigurationservice>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: setfunctionalprofileconfigurationservice  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getsetfunctionalprofile();
  }
getsetfunctionalprofile() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getsetfunctionalprofileconfiguration(objrequest).subscribe((data: any) => {
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
