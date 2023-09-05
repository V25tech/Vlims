import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogComponentComponent } from './auditlog-component.component';

describe('AuditlogComponentComponent', () => {
  let component: AuditlogComponentComponent;
  let fixture: ComponentFixture<AuditlogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditlogComponentComponent]
    });
    fixture = TestBed.createComponent(AuditlogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
