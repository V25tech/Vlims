import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audithierarchyhomepage',
  templateUrl: './audithierarchyhomepage.component.html',
  styleUrls: ['./audithierarchyhomepage.component.scss']
})
export class AudithierarchyhomepageComponent {
  constructor(private router: Router) {}
  navigateTo(navTo: any) {
    debugger;
    if (navTo === 'auditdepartments') {
      this.router.navigate(['/auditdepartments']);
    } else if (navTo === 'auditRoles') {
      this.router.navigate(['/auditRoles']);
    } else if (navTo === 'auditprofile') {
      this.router.navigate(['/auditprofile']);
    } else if (navTo === 'plant') {
      this.router.navigate(['/admin/plant']);
    } else if (navTo === 'User') {
      this.router.navigate(['/admin/users']);
    } else if (navTo === 'Approval') {
      this.router.navigate(['/admin/approval']);
    } else if (navTo === 'groups') {
      this.router.navigate(['admin/groups']);
    } else if (navTo === 'Roles') {
      this.router.navigate(['/admin/hierarchy/roles']);    }
    else if (navTo === 'Approvalconfig') {
      this.router.navigate(['/admin/approvalconfig']);
    }  else if (navTo === 'departments') {
      this.router.navigate(['/admin/hierarchy/departments']);
    } else if (navTo === 'activeuser') {
      this.router.navigate(['/admin/activeuser']);
    } else if (navTo === 'home') {
      this.router.navigate(['/home/admin']);
    }
  }
}
