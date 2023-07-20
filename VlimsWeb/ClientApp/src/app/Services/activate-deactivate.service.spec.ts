import { TestBed } from '@angular/core/testing';

import { ActivateDeactivateService } from './activate-deactivate.service';

describe('ActivateDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivateDeactivateService = TestBed.get(ActivateDeactivateService);
    expect(service).toBeTruthy();
  });
});
