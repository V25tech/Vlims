import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditRequestNewPageComponent } from './audit-request-new-page.component';

describe('AuditRequestNewPageComponent', () => {
  let component: AuditRequestNewPageComponent;
  let fixture: ComponentFixture<AuditRequestNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditRequestNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditRequestNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
