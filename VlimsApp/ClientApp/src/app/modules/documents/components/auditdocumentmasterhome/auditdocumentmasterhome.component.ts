import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditdocumentmasterhome',
  templateUrl: './auditdocumentmasterhome.component.html',
  styleUrls: ['./auditdocumentmasterhome.component.scss']
})
export class AuditdocumentmasterhomeComponent {
  constructor(private router: Router) {}

  navigateTo(navTo: any) {
    if (navTo === 'auditdocumettypes') {
      this.router.navigate(['/auditdocumettypes']);
    } else if (navTo === 'audittemplatesgrid') {
      this.router.navigate(['/audittemplatesgrid']);
    } else if (navTo === 'auditworkflowgrid') {
      this.router.navigate(['/auditworkflowgrid']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'document-manager') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
