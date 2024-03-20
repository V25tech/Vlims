import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditdepartmentgridpageComponent } from './auditdepartmentgridpage.component';

describe('AuditdepartmentgridpageComponent', () => {
  let component: AuditdepartmentgridpageComponent;
  let fixture: ComponentFixture<AuditdepartmentgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditdepartmentgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditdepartmentgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
