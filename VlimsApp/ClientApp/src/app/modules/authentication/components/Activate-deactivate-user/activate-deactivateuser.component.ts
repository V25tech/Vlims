import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';

import { activateDeactivateuser, RequestContext, RoleConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ActivateDeactivateService } from '../../../services/activate-deactivate.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';

@Component({
  selector: 'app-activate-deactivateuser',
  templateUrl: './activate-deactivateuser.component.html',
  styleUrls: ['./activate-deactivateuser.component.css']
})
export class ActivateDeactivateuserComponent implements OnInit {
  types: activateDeactivateuser[] = [];
  constructor(private commonsvc: CommonService, private doctypeservice: ActivateDeactivateService, private Userservice: UsersconfigurationService, private router: Router) { }

  ngOnInit() {
    this.get_activate_deactivateuser();
  }
  get_activate_deactivateuser() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 1,
      Id: 0
    };
    return this.Userservice.getusers(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {

    });
  }
  navigateToAddRoles(): void {
    this.router.navigate(['/document-type/add']);
  }
  editdoc(doc: RoleConfiguration) {

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
