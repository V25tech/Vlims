import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCommonGridComponent } from './audit-common-grid.component';

describe('AuditCommonGridComponent', () => {
  let component: AuditCommonGridComponent;
  let fixture: ComponentFixture<AuditCommonGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditCommonGridComponent]
    });
    fixture = TestBed.createComponent(AuditCommonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
