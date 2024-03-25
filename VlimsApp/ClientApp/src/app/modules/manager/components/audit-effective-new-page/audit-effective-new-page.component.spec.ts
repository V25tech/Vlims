import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditEffectiveNewPageComponent } from './audit-effective-new-page.component';

describe('AuditEffectiveNewPageComponent', () => {
  let component: AuditEffectiveNewPageComponent;
  let fixture: ComponentFixture<AuditEffectiveNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditEffectiveNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditEffectiveNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
