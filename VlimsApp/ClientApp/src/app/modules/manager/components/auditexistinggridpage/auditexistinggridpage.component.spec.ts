import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditexistinggridpageComponent } from './auditexistinggridpage.component';

describe('AuditexistinggridpageComponent', () => {
  let component: AuditexistinggridpageComponent;
  let fixture: ComponentFixture<AuditexistinggridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditexistinggridpageComponent]
    });
    fixture = TestBed.createComponent(AuditexistinggridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
