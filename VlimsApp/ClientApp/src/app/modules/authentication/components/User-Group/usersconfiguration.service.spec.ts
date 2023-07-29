import { TestBed } from '@angular/core/testing';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';


describe('UsersconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersconfigurationService = TestBed.get(UsersconfigurationService);
    expect(service).toBeTruthy();
  });
});
