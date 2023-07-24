import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent {
  workflowsDatasource = [];
  constructor(
    private router: Router,
    
  ) {}

  ngOnInit() {
    
  }

  navigateToAddWorkflow(): void {
    this.router.navigate(['/workflows/add']);
  }

  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else {
      return '';
    }
  }
}
