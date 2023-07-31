import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RequestContext, Usergroupconfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { usergroupconfigurationService } from '../../../services/add-usergroupconfiguration.service';



@Component({
  selector: 'app-usergroupconfiguration',
  templateUrl: './usergroupconfiguration.component.html'
})
export class UsergroupconfigurationComponent implements OnInit {

  name: string = 'Product Type';
  types: Usergroupconfiguration[] = [];
  //newtype: usergroupconfigurationService;
  //objProductType: Usergroupconfiguration;
  retailId: number=0;
  header: string='';
  actiontype: number=0;
  pageConfig: any;
  searchstr: string='';
  constructor(private commonsvc: CommonService, private doctypeservice: usergroupconfigurationService,  private router: Router) { }

  ngOnInit() {
    this.getusergroupInfo();
  }
  getusergroupInfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.doctypeservice.getusergroupconfiguration(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {
      
    });
  }
  editdoc(doc: Usergroupconfiguration) {
    debugger
    this.commonsvc.userGroupConfig = doc;
    this.router.navigate(['/admin/groups/edit', doc.Ugcid]);
  }
  addusergroup(): void {
    debugger
    this.router.navigate(['admin/groups/add',this.types.length]);
  }
  getStatusClass(status: string): string {
    debugger
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return '';
    }
  }
 
}
