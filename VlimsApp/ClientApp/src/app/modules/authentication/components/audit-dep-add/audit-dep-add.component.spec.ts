import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDepAddComponent } from './audit-dep-add.component';

describe('AuditDepAddComponent', () => {
  let component: AuditDepAddComponent;
  let fixture: ComponentFixture<AuditDepAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditDepAddComponent]
    });
    fixture = TestBed.createComponent(AuditDepAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
