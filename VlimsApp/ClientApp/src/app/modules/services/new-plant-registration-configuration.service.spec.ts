import { TestBed } from '@angular/core/testing';

import { NewPlantRegistrationConfigurationService } from './new-plant-registration-configuration.service';

describe('NewPlantRegistrationConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPlantRegistrationConfigurationService = TestBed.get(NewPlantRegistrationConfigurationService);
    expect(service).toBeTruthy();
  });
});
