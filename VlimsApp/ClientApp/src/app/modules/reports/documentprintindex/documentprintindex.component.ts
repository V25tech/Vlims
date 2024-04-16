import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-docprint-index',
  templateUrl: './documentprintindex.component.html',
  //  styleUrls: ['./document-manager-home.component.scss']
})
export class DocumentPrintIndexComponent {
  constructor(private router: Router, public commonSrvc: CommonService) { }

  navigateTo(navTo: any) {
    if (navTo === 'requests') {
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
    else if (navTo === 'existing-document-requests') {
      this.router.navigate(['/existingdoc']);
    }
    else if (navTo === 'document-revision') {
      this.router.navigate(['/revision']);
    }
    else if (navTo === 'existingdocuments') {
      this.router.navigate(['/' + navTo]);
    }
  }
}
