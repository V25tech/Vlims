import { TestBed } from '@angular/core/testing';

import { NewPrintRequestService } from './new-print-request.service';

describe('NewPrintRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPrintRequestService = TestBed.get(NewPrintRequestService);
    expect(service).toBeTruthy();
  });
});
