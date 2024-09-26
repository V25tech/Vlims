import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditplantgridpageComponent } from './auditplantgridpage.component';

describe('AuditplantgridpageComponent', () => {
  let component: AuditplantgridpageComponent;
  let fixture: ComponentFixture<AuditplantgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditplantgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditplantgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
