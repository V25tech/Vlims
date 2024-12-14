import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditusermanagementgridpageComponent } from './auditusermanagementgridpage.component';

describe('AuditusermanagementgridpageComponent', () => {
  let component: AuditusermanagementgridpageComponent;
  let fixture: ComponentFixture<AuditusermanagementgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditusermanagementgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditusermanagementgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
