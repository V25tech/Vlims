import { TestBed } from '@angular/core/testing';

import { DocumentTypeServiceService } from './document-type-service.service';

describe('DocumentTypeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentTypeServiceService = TestBed.get(DocumentTypeServiceService);
    expect(service).toBeTruthy();
  });
});
