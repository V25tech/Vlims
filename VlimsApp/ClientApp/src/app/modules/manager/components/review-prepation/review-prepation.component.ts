import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Preparation } from '../../models/preparation';

@Component({
  selector: 'app-review-prepation',
  templateUrl: './review-prepation.component.html',
  styleUrls: ['./review-prepation.component.scss']
})
export class ReviewPrepationComponent {
  constructor(private location: Location, private router: Router) {}

  preparation: Preparation = {
    reqCode: 'REQ-001',
    documentTitle:'',
    docNoType:'System Generated',
    documentNumber:'',
    documentType:'',
    department:'',
    workflow:'',
    document:'',
    template:'',
    details:'',
    assignedToGroup:'',
    status:''
  }

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

  templatesSource= [
    { label: 'Select Template', value: '' },
    { label: 'Template 1', value: 'option2' },
    { label: 'Template 2', value: 'option3' },
  ];

  savePreparation() {}

  onCancel() {
    this.location.back();
  }
}
