import { TestBed } from '@angular/core/testing';

import { DocumentPreperationService } from './document-preperation.service';

describe('DocumentPreperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentPreperationService = TestBed.get(DocumentPreperationService);
    expect(service).toBeTruthy();
  });
});
