import { TestBed } from '@angular/core/testing';

import { DepartmentconfigurationService } from './departmentconfiguration.service';

describe('DepartmentconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentconfigurationService = TestBed.get(DepartmentconfigurationService);
    expect(service).toBeTruthy();
  });
});
