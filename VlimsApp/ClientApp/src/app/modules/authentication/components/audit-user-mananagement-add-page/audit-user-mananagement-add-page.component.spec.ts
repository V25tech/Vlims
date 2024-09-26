import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditUserMananagementAddPageComponent } from './audit-user-mananagement-add-page.component';

describe('AuditUserMananagementAddPageComponent', () => {
  let component: AuditUserMananagementAddPageComponent;
  let fixture: ComponentFixture<AuditUserMananagementAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditUserMananagementAddPageComponent]
    });
    fixture = TestBed.createComponent(AuditUserMananagementAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
