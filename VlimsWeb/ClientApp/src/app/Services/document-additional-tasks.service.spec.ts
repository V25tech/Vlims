import { TestBed } from '@angular/core/testing';

import { DocumentAdditionalTasksService } from './document-additional-tasks.service';

describe('DocumentAdditionalTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentAdditionalTasksService = TestBed.get(DocumentAdditionalTasksService);
    expect(service).toBeTruthy();
  });
});
