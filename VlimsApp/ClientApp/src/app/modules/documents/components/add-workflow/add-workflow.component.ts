import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Workflow } from '../../models/workflows';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
})
export class AddWorkflowComponent {
  workflow: Workflow = {
    id: 0,
    name:'',
    code:'',
    stage: '',
    type: '',
    department:'',
    reviewsCount:1,
    approvalsCount:1,
    reviewsType: 'user',
    approvalsType:'user',
    reviewers: [],
    approvals: [],
    status: '',
  };

  reviewersDatasource = [
    {
      label: 'User',
      value: 'user',
      items: [
        { label: 'Select User', value: '' },
        { label: 'User 1', value: 'user1' },
        { label: 'User 2', value: 'user2' },
        { label: 'User 3', value: 'user3' },
      ]
  },
  {
      label: 'Groups',
      value: 'group',
      items: [
        { label: 'User Group 1', value: 'usergroup1' },
        { label: 'User Group 2', value: 'usergroup2' },
        { label: 'User Group 3', value: 'usergroup3' },
      ]
  },
  ]

  reviewers: { value: string }[] = [{ value: '' }];
  approvers: { value: string }[] = [{ value: '' }];

  addReviewer() {
    this.reviewers.push({ value: '' });
  }

  removeReviewer(index: number) {
    this.reviewers.splice(index, 1);
  }

  addApprover() {
    this.approvers.push({ value: '' });
  }

  removeApprover(index: number) {
    this.approvers.splice(index, 1);
  }

  departments = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
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

  reviewersSource = [
    { label: 'User 1', value: 'user1' },
    { label: 'User 2', value: 'user2' },
    { label: 'User 3', value: 'user3' },
  ]

  groupSource = [
    { label: 'Select Group', value: '' },
    { label: 'Group 1', value: 'user1' },
    { label: 'Group 2', value: 'user2' },
    { label: 'Group 3', value: 'user3' },
  ]

  constructor(
    private location: Location,
    private router: Router
  ) {}

  addWorkflow() {
    this.reviewers.map(reviewer => reviewer.value)
    console.log(this.reviewers);
  }

  onCancel() {
    this.location.back();
  }
}
