import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-documents-landing',
  templateUrl: './documents-landing.component.html',
  styleUrls: ['./documents-landing.component.scss']
})
export class DocumentsLandingComponent {

  constructor(private router: Router){}

  navigateTo(navTo: any) {
    debugger;
    if(navTo === 'assigned'){
      this.router.navigate(['/assigned']); 
    } else if (navTo === 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'document-manager') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'admin') {
      this.router.navigate(['/document-manager']);
    }

  }

}
