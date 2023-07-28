import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-master-home',
  templateUrl: './document-master-home.component.html',
  styleUrls: ['./document-master-home.component.scss'],
})
export class DocumentMasterHomeComponent {
  constructor(private router: Router) {}

  navigateTo(navTo: any) {
    if (navTo === 'document-Security') {
      this.router.navigate(['/securitymanagement']);
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
