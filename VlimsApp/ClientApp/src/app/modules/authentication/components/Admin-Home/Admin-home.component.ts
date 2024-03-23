import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  constructor(private router: Router) {}

  navigateTo(navTo: any) {
    if (navTo === 'security') {
      this.router.navigate(['/admin/security']);
    } else if (navTo === 'hierrachy') {
      this.router.navigate(['/admin/hierarchy']);
    } else if (navTo === 'plant') {
      this.router.navigate(['/admin/plant']);
    } else if (navTo === 'User') {
      this.router.navigate(['/admin/usermanagement']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/admin/approval']);
    } else if (navTo === 'groups') {
      this.router.navigate(['admin/groups']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/admin/roles']);    }
    else if (navTo === 'Approvalconfig') {
      this.router.navigate(['/admin/approvalconfig']);
    }  else if (navTo === 'departments') {
      this.router.navigate(['/admin/departments']);
    } else if (navTo === 'activeuser') {
      this.router.navigate(['/admin/activeuser']);
    } else if (navTo === 'auditadmin') {
      this.router.navigate(['/auditadmin']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
    else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
