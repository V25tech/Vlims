import { TestBed } from '@angular/core/testing';

import { DocumentPrintService } from './document-print.service';

describe('DocumentPrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentPrintService = TestBed.get(DocumentPrintService);
    expect(service).toBeTruthy();
  });
});
