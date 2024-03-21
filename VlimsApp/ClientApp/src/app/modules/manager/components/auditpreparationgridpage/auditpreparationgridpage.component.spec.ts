import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditpreparationgridpageComponent } from './auditpreparationgridpage.component';

describe('AuditpreparationgridpageComponent', () => {
  let component: AuditpreparationgridpageComponent;
  let fixture: ComponentFixture<AuditpreparationgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditpreparationgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditpreparationgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
