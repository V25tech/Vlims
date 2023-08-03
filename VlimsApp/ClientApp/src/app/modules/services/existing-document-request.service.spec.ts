import { TestBed } from '@angular/core/testing';

import { ExistingDocumentRequestService } from './existing-document-request.service';

describe('ExistingDocumentRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExistingDocumentRequestService = TestBed.get(ExistingDocumentRequestService);
    expect(service).toBeTruthy();
  });
});
