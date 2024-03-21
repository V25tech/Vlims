import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditadminhome',
  templateUrl: './auditadminhome.component.html',
  styleUrls: ['./auditadminhome.component.scss']
})
export class AuditadminhomeComponent {
  constructor(private router: Router) {}

  navigateTo(navTo: any) {
    debugger;
    if (navTo === 'security') {
      this.router.navigate(['/admin/security']);
    } else if (navTo === 'hierrachy') {
      this.router.navigate(['/admin/hierarchy']);
    } else if (navTo === 'auditplant') {
      this.router.navigate(['/auditplant']);
    } else if (navTo === 'auditUser') {
      this.router.navigate(['/auditUser']);
    } else if (navTo === 'audithierrachy') {
      this.router.navigate(['/audithierrachy']);
    } else if (navTo === 'groups') {
      this.router.navigate(['admin/groups']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/admin/roles']);    }
    else if (navTo === 'Approvalconfig') {
      this.router.navigate(['/admin/approvalconfig']);
    }  else if (navTo === 'departments') {
      this.router.navigate(['/admin/departments']);
    } else if (navTo === 'activeuser') {
      this.router.navigate(['/admin/activeuser']);
    } else if (navTo === 'auditadmin') {
      this.router.navigate(['/auditadmin']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
