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
    if (navTo === 'securitymgmt') {
      this.router.navigate(['/securitymgmt']);
    } else if (navTo === 'Hierarchy') {
      this.router.navigate(['/templates']);
    } else if (navTo === 'Plant') {
      this.router.navigate(['/workflow']);
    } else if (navTo === 'User') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
