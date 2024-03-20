import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditdocumentmasterhomeComponent } from './auditdocumentmasterhome.component';

describe('AuditdocumentmasterhomeComponent', () => {
  let component: AuditdocumentmasterhomeComponent;
  let fixture: ComponentFixture<AuditdocumentmasterhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditdocumentmasterhomeComponent]
    });
    fixture = TestBed.createComponent(AuditdocumentmasterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
