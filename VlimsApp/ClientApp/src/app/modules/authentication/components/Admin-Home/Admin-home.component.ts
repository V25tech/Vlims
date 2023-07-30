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
    debugger;
    if (navTo === 'security') {
      this.router.navigate(['/admin/security']);
    } else if (navTo === 'hierrachy') {
      this.router.navigate(['/admin/department']);
    } else if (navTo === 'plant') {
      this.router.navigate(['/admin/plant']);
    } else if (navTo === 'User') {
      this.router.navigate(['/admin/user']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/admin/approvalconfig']);
    } else if (navTo === 'UserGroup') {
      this.router.navigate(['/admin/usergroup']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/admin/roles']);    }
    else if (navTo === 'Approvalconfig') {
      this.router.navigate(['/admin/approvalconfig']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}