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
    if (navTo === 'document-types') {
      this.router.navigate(['/document-types']);
    } else if (navTo === 'templates') {
      this.router.navigate(['/templates']);
    } else if (navTo === 'workflow') {
      this.router.navigate(['/workflow']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'document-manager') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
