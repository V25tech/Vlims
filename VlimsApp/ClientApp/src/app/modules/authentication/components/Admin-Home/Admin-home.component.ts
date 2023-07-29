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
      this.router.navigate(['/department']);
    } else if (navTo === 'plant') {
      this.router.navigate(['/plant']);
    } else if (navTo === 'User') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'UserGroup') {
      this.router.navigate(['/usergroupconfiguration']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/Roles']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
