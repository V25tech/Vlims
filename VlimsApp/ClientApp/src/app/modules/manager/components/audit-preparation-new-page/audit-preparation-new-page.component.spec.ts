import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPreparationNewPageComponent } from './audit-preparation-new-page.component';

describe('AuditPreparationNewPageComponent', () => {
  let component: AuditPreparationNewPageComponent;
  let fixture: ComponentFixture<AuditPreparationNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditPreparationNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditPreparationNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
