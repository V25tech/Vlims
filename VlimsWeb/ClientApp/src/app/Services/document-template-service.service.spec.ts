import { TestBed } from '@angular/core/testing';

import { DocumentTemplateServiceService } from './document-template-service.service';

describe('DocumentTemplateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentTemplateServiceService = TestBed.get(DocumentTemplateServiceService);
    expect(service).toBeTruthy();
  });
});
