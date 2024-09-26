import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditmanagerhomepage',
  templateUrl: './auditmanagerhomepage.component.html',
  styleUrls: ['./auditmanagerhomepage.component.scss']
})
export class AuditmanagerhomepageComponent {
  constructor(private router: Router) { }

  navigateTo(navTo: any) {
    if (navTo === 'auditrequests') {
      debugger;
      this.router.navigate(['/auditrequests']);
    } else if (navTo === 'auditpreparations') {
      this.router.navigate(['/auditpreparations']);
    } else if (navTo === 'auditeffectives') {
      this.router.navigate(['/auditeffectives']);
    } else if (navTo === 'auditdocumentrevision') {
      this.router.navigate(['/auditdocumentrevision']);
    } else if (navTo === 'auditdocumentprint') {
      this.router.navigate(['/auditdocumentprint']);
    } else if (navTo === 'auditexistingdocumentrequests') {
      this.router.navigate(['/auditexistingdocumentrequests']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
    else if(navTo === 'existing-document-requests'){    
      this.router.navigate(['/existingdoc']);
    }
    else if(navTo === 'document-revision'){    
      this.router.navigate(['/revision']);
    }
    else if(navTo === 'auditmanager'){    
      this.router.navigate(['/auditmanager']);
    } else if (navTo === 'auditprint') {
      this.router.navigate(['/auditprint']);
    }
    

  }
}
