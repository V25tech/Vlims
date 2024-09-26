import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditrolegridpageComponent } from './auditrolegridpage.component';

describe('AuditrolegridpageComponent', () => {
  let component: AuditrolegridpageComponent;
  let fixture: ComponentFixture<AuditrolegridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditrolegridpageComponent]
    });
    fixture = TestBed.createComponent(AuditrolegridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
