import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditprintgridpageComponent } from './auditprintgridpage.component';

describe('AuditprintgridpageComponent', () => {
  let component: AuditprintgridpageComponent;
  let fixture: ComponentFixture<AuditprintgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditprintgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditprintgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
