import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditrevisiongridpageComponent } from './auditrevisiongridpage.component';

describe('AuditrevisiongridpageComponent', () => {
  let component: AuditrevisiongridpageComponent;
  let fixture: ComponentFixture<AuditrevisiongridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditrevisiongridpageComponent]
    });
    fixture = TestBed.createComponent(AuditrevisiongridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
