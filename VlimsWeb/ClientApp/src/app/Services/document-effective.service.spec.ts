import { TestBed } from '@angular/core/testing';

import { DocumentEffectiveService } from './document-effective.service';

describe('DocumentEffectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentEffectiveService = TestBed.get(DocumentEffectiveService);
    expect(service).toBeTruthy();
  });
});
