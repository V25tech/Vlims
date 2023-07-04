import { TestBed } from '@angular/core/testing';

import { WorkflowServiceService } from './workflow-service.service';

describe('WorkflowServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowServiceService = TestBed.get(WorkflowServiceService);
    expect(service).toBeTruthy();
  });
});
