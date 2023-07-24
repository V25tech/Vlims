import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-effectives',
  templateUrl: './effectives.component.html',
  styleUrls: ['./effectives.component.scss'],
})
export class EffectivesComponent {
  constructor(private router: Router, private managerService: ManagerService) {}

  navigateToReviewEffective(): void {
    this.router.navigate(['/effectives/review']);
  }

  effectivesDatasource = [];

  ngOnInit() {
    this.managerService.getEffectivesData().subscribe((data: any) => {
      this.effectivesDatasource = data;
    });
  }

  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Approved') {
      return 'status-approved';
    } else if (status === 'Pending') {
      return 'status-pending';
    } else {
      return '';
    }
  }
}
