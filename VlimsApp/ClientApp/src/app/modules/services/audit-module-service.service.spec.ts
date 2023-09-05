import { TestBed } from '@angular/core/testing';

import { AuditModuleServiceService } from './audit-module-service.service';

describe('AuditModuleServiceService', () => {
  let service: AuditModuleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditModuleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
