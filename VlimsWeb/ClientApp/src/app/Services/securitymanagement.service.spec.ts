import { TestBed } from '@angular/core/testing';

import { SecuritymanagementService } from './securitymanagement.service';

describe('SecuritymanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecuritymanagementService = TestBed.get(SecuritymanagementService);
    expect(service).toBeTruthy();
  });
});
