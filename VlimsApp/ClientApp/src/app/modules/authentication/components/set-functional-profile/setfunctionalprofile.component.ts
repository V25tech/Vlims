

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestContext, functionalprofile } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { setfunctionalprofileconfigurationservice } from '../../../services/setfunctionalprofile.service';


@Component({
  selector: 'app-setfunctionalprofile',
  templateUrl: './setfunctionalprofile.component.html'
  
})
export class SetfunctionalprofileComponent implements OnInit {
  types: functionalprofile[]=[];
  profile=new functionalprofile()
  editMode:boolean=false;
  viewMode:boolean=false;
  constructor(private commonsvc: CommonService, private setprofileservice: setfunctionalprofileconfigurationservice  ,private router: Router) { }

  ngOnInit() {
    this.getsetfunctionalprofile();
  }
getsetfunctionalprofile() {
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.setprofileservice.getsetfunctionalprofileconfiguration(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        console.log(this.types);
      }, er => {
     
      });
  }
  onSubmit(profileinfo:functionalprofile)
  {   
    debugger;
    this.setprofileservice.addsetfunctionalprofileconfiguration(profileinfo).subscribe((res: any) => {
  });
  }
  onCancel()
  {
    
  }
}
