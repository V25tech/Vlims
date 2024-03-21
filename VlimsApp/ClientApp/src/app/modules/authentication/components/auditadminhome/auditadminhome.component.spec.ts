import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditadminhomeComponent } from './auditadminhome.component';

describe('AuditadminhomeComponent', () => {
  let component: AuditadminhomeComponent;
  let fixture: ComponentFixture<AuditadminhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditadminhomeComponent]
    });
    fixture = TestBed.createComponent(AuditadminhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
