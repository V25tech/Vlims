import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsetfuncprofilegridpageComponent } from './auditsetfuncprofilegridpage.component';

describe('AuditsetfuncprofilegridpageComponent', () => {
  let component: AuditsetfuncprofilegridpageComponent;
  let fixture: ComponentFixture<AuditsetfuncprofilegridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditsetfuncprofilegridpageComponent]
    });
    fixture = TestBed.createComponent(AuditsetfuncprofilegridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
