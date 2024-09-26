import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-document-master-home',
  templateUrl: './document-master-home.component.html',
  styleUrls: ['./document-master-home.component.scss'],
})
export class DocumentMasterHomeComponent {
  constructor(private router: Router,public commonSrvc: CommonService) {}

  navigateTo(navTo: any) {
    if (navTo === 'document-types') {
      this.router.navigate(['/document-types']);
    } else if (navTo === 'templates') {
      this.router.navigate(['/templates']);
    } else if (navTo === 'workflow') {
      this.router.navigate(['/workflow']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'auditdocmaster') {
      this.router.navigate(['/auditdocmaster']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
