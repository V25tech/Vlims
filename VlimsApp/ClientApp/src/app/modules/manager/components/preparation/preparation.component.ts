import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent {
  constructor(private router: Router, private managerService: ManagerService) {}

  navigateToAddPreparation(): void {
    this.router.navigate(['/preparation/review']);
  }

  preparationsDatasource = [];

  ngOnInit() {
    this.managerService.getPreparationsData().subscribe((data: any) => {
      this.preparationsDatasource = data;
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
    }else if (status === 'Pending') {
      return 'status-pending';
    } else {
      return '';
    }
  }
}
