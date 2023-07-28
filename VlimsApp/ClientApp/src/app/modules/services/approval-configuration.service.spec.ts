import { TestBed } from '@angular/core/testing';

import { ApprovalConfigurationService } from './approval-configuration.service';

describe('ApprovalConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalConfigurationService = TestBed.get(ApprovalConfigurationService);
    expect(service).toBeTruthy();
  });
});




