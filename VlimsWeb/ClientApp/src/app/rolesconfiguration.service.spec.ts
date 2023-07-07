import { TestBed } from '@angular/core/testing';

import { RolesconfigurationService } from './rolesconfiguration.service';

describe('RolesconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesconfigurationService = TestBed.get(RolesconfigurationService);
    expect(service).toBeTruthy();
  });
});
