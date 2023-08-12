import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent {
  constructor(private router: Router) {}
  navigateTo(navTo: any) {
    debugger;
    if (navTo === 'security') {
      this.router.navigate(['/admin/security']);
    } else if (navTo === 'hierrachy') {
      this.router.navigate(['/admin/profile']);
    } else if (navTo === 'profile') {
      this.router.navigate(['/admin/hierarchy/profile']);
    } else if (navTo === 'plant') {
      this.router.navigate(['/admin/plant']);
    } else if (navTo === 'User') {
      this.router.navigate(['/admin/usermanagement/users']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/admin/approval']);
    } else if (navTo === 'groups') {
      this.router.navigate(['admin/usermanagement/groups']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/admin/hierarchy/roles']);    }
    else if (navTo === 'Approvalconfig') {
      this.router.navigate(['/admin/approvalconfig']);
    }  else if (navTo === 'departments') {
      this.router.navigate(['/admin/hierarchy/departments']);
    } else if (navTo === 'activeuser') {
      this.router.navigate(['/admin/usermanagement/activeuser']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home/admin']);
    }
  }
}
