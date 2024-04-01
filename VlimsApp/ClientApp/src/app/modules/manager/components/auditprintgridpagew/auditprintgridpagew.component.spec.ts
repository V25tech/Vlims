import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditprintgridpagewComponent } from './auditprintgridpagew.component';

describe('AuditprintgridpagewComponent', () => {
  let component: AuditprintgridpagewComponent;
  let fixture: ComponentFixture<AuditprintgridpagewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditprintgridpagewComponent]
    });
    fixture = TestBed.createComponent(AuditprintgridpagewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
