import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditeffectivegridpageComponent } from './auditeffectivegridpage.component';

describe('AuditeffectivegridpageComponent', () => {
  let component: AuditeffectivegridpageComponent;
  let fixture: ComponentFixture<AuditeffectivegridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditeffectivegridpageComponent]
    });
    fixture = TestBed.createComponent(AuditeffectivegridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
