import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { setfunctionalprofileconfigurationservice } from '../../../services/setfunctionalprofile.service';

@Component({
  selector: 'app-functionalprofile',
  templateUrl: './functionalprofile.component.html',
  styleUrls: ['./functionalprofile.component.css']
})
export class SetfunctionalprofileComponent implements OnInit {
  types: Array<setfunctionalprofileconfigurationservice>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: setfunctionalprofileconfigurationservice  ,private router: Router) { }

  ngOnInit() {
    this.getsetfunctionalprofile();
  }
getsetfunctionalprofile() {
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getsetfunctionalprofileconfiguration(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;       
      });
  }
}
