import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditworkflowgridpageComponent } from './auditworkflowgridpage.component';

describe('AuditworkflowgridpageComponent', () => {
  let component: AuditworkflowgridpageComponent;
  let fixture: ComponentFixture<AuditworkflowgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditworkflowgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditworkflowgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
