import { TestBed } from '@angular/core/testing';

import { DocumentRevisonService } from './document-revison.service';

describe('DocumentRevisonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentRevisonService = TestBed.get(DocumentRevisonService);
    expect(service).toBeTruthy();
  });
});
