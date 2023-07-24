import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Requests } from '../../models/requests';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent {
  constructor(private location: Location, private router: Router) {}

  request: Requests = {
    id: 0,
    reqCode: '',
    documentType: '',
    department: '',
    workflow:'',
    purpose:'',
    registeredBy: '',
    registeredOn: '',
    approvedBy: '',
    approvedOn: '',
    status: '',
  };

  departmentsSource = [
    { label: 'Select Department', value: '' },
    { label: 'department 1', value: 'option1' },
    { label: 'department 2', value: 'option2' },
    { label: 'department 3', value: 'option3' },
  ];

  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];

  typeSource = [
    { label: 'Select Type', value: '' },
    { label: 'Type 1', value: 'option2' },
    { label: 'Type 2', value: 'option3' },
  ];

  workflowsSource = [
    { label: 'Select Workflow', value: '' },
    { label: 'Workflow 1', value: 'option2' },
    { label: 'Workflow 2', value: 'option3' },
  ];

  addRequest() {}

  onCancel() {
    this.location.back();
  }
}
