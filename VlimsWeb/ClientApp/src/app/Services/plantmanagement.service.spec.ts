import { TestBed } from '@angular/core/testing';
import { PlantmanagementService } from './plantmanagement.service';

describe('PlantmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantmanagementService = TestBed.get(PlantmanagementService);
    expect(service).toBeTruthy();
  });
});
