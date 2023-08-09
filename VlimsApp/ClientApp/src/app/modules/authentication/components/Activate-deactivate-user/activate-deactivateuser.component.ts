import { Component, OnInit } from '@angular/core'; import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { activateDeactivateuser, RequestContext, RoleConfiguration, UserConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ActivateDeactivateService } from '../../../services/activate-deactivate.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';

@Component({
  selector: 'app-activate-deactivateuser',
  templateUrl: './activate-deactivateuser.component.html'

})
export class ActivateDeactivateuserComponent implements OnInit {
  types: activateDeactivateuser[] = [];
  adduser = new UserConfiguration();
  constructor(private commonsvc: CommonService, private doctypeservice: ActivateDeactivateService, private toastr: ToastrService, private userservice: UsersconfigurationService, private Userservice: UsersconfigurationService, private router: Router) { }

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
  editdoc(doc: activateDeactivateuser) {
    this.adduser.UCFId = doc.UCFId;
    this.adduser.UserManagementID = "1";
    debugger;
    if (doc.Status == 'Active') {
      this.adduser.Status = 'InActive';     
      this.userservice.update(this.adduser).subscribe((data: any) => {
      });
      this.toastr.success('User  is made InActive!', 'Successfully.!');
    }
    else {
      this.adduser.Status = 'Active';      
      this.userservice.update(this.adduser).subscribe((data: any) => {
      });
      this.toastr.success('User  is made Active!', 'Successfully.!');
    }
    

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
