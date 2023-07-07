import { TestBed } from '@angular/core/testing';

import { UsergroupconfigurationService } from './usergroupconfiguration.service';

describe('UsergroupconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsergroupconfigurationService = TestBed.get(UsergroupconfigurationService);
    expect(service).toBeTruthy();
  });
});
