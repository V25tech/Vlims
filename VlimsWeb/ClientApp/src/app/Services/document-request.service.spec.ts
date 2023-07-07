import { TestBed } from '@angular/core/testing';

import { DocumentRequestService } from './document-request.service';

describe('DocumentRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentRequestService = TestBed.get(DocumentRequestService);
    expect(service).toBeTruthy();
  });
});
