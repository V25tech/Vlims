import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPrintNewPageComponent } from './audit-print-new-page.component';

describe('AuditPrintNewPageComponent', () => {
  let component: AuditPrintNewPageComponent;
  let fixture: ComponentFixture<AuditPrintNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditPrintNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditPrintNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
