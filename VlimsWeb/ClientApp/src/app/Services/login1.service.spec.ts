import { TestBed } from '@angular/core/testing';
import { LoginServicepage } from './login1.service';


describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginServicepage = TestBed.get(LoginServicepage);
    expect(service).toBeTruthy();
  });
});


