import { TestBed } from '@angular/core/testing';

import { setfunctionalprofileconfigurationservice } from './setfunctionalprofile.service';

describe('SetfunctionalprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: setfunctionalprofileconfigurationservice = TestBed.get(setfunctionalprofileconfigurationservice);
    expect(service).toBeTruthy();
  });
});
