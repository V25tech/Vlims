import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit{
  constructor(private router: Router, private managerService: ManagerService) {}

  navigateToAddRequest(): void {
    this.router.navigate(['/requests/add']);
  }

  requestsDatasource = [];

  ngOnInit() {
    this.managerService.getRequestsData().subscribe((data: any) => {
      this.requestsDatasource = data;
    });
  }

  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    }else if (status === 'Approved') {
      return 'status-approved';
    } else {
      return '';
    }
  }
  
}
