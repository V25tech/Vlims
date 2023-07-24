import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.scss'],
})
export class AssignedComponent implements OnInit {

  assignedDatasource = [];
  constructor() {}

  ngOnInit() {
   
  }

  getStatusClass(status: string): string {
    const status_ = status.toLowerCase();
    if (status_ === 'completed') {
      return 'status-completed';
    } else if (status_ === 'in progress') {
      return 'status-in-progress';
    } else if (status_ === 'under review') {
      return 'status-under-review';
    }
    else if (status_ === 'pending') {
      return 'status-pending';
    }
     else {
      return '';
    }
  }

}
