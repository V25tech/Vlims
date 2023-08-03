import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-manager-home',
  templateUrl: './document-manager-home.component.html',
  styleUrls: ['./document-manager-home.component.scss']
})
export class DocumentManagerHomeComponent {
  constructor(private router: Router) { }

  navigateTo(navTo: any) {
    if (navTo === 'requests') {
      debugger;
      this.router.navigate(['/requests']);
    } else if (navTo === 'preparations') {
      this.router.navigate(['/preparations']);
    } else if (navTo === 'effectives') {
      this.router.navigate(['/effectives']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/effectives']);
    } else if (navTo === 'document-manager') {
      this.router.navigate(['/effectives']);
    } else if (navTo === 'document-print') {
      this.router.navigate(['/print']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
    else if(navTo === 'existing-document-requests'){    
      this.router.navigate(['/existingdoc/add']);
    }
  }
}
