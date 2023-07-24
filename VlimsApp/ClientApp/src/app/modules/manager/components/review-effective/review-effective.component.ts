import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Effective} from '../../models/effective';

@Component({
  selector: 'app-review-effective',
  templateUrl: './review-effective.component.html',
  styleUrls: ['./review-effective.component.scss']
})
export class ReviewEffectiveComponent {
  constructor(private location: Location, private router: Router) {}

  effective: Effective = {
    documentTitle: 'SOP for DMS Implementation',
    documentNumber: 'QA/SOP/023/001-00',
    documentType: 'SOP ',
    department: 'QC ',
    workflow: 'Workflow-1 ',
    document: ' ',
    effectiveDate: ' ',
    reviewDate: ' ',
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

  saveEffective() {}

  onCancel() {
    this.location.back();
  }
  
}
