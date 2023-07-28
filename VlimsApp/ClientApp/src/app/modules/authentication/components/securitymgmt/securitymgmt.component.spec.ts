import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritymgmtComponent } from './securitymgmt.component';

describe('SecuritymgmtComponent', () => {
  let component: SecuritymgmtComponent;
  let fixture: ComponentFixture<SecuritymgmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecuritymgmtComponent]
    });
    fixture = TestBed.createComponent(SecuritymgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
