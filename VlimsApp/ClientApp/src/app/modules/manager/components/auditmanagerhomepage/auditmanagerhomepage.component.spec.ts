import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditmanagerhomepageComponent } from './auditmanagerhomepage.component';

describe('AuditmanagerhomepageComponent', () => {
  let component: AuditmanagerhomepageComponent;
  let fixture: ComponentFixture<AuditmanagerhomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditmanagerhomepageComponent]
    });
    fixture = TestBed.createComponent(AuditmanagerhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
