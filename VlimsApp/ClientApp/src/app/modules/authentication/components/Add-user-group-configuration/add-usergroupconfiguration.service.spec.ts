import { TestBed } from '@angular/core/testing';

import { AddUsergroupconfigurationService } from './add-usergroupconfiguration.service';

describe('AddUsergroupconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddUsergroupconfigurationService = TestBed.get(AddUsergroupconfigurationService);
    expect(service).toBeTruthy();
  });
});
