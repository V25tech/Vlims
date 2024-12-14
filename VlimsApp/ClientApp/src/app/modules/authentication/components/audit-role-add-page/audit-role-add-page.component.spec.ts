import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditRoleAddPageComponent } from './audit-role-add-page.component';

describe('AuditRoleAddPageComponent', () => {
  let component: AuditRoleAddPageComponent;
  let fixture: ComponentFixture<AuditRoleAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditRoleAddPageComponent]
    });
    fixture = TestBed.createComponent(AuditRoleAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
