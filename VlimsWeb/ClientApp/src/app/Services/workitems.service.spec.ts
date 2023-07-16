import { TestBed } from '@angular/core/testing';

import { WorkitemsService } from './workitems.service';

describe('WorkitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkitemsService = TestBed.get(WorkitemsService);
    expect(service).toBeTruthy();
  });
});
