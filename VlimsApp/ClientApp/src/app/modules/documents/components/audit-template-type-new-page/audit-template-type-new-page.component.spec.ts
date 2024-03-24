import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTemplateTypeNewPageComponent } from './audit-template-type-new-page.component';

describe('AuditTemplateTypeNewPageComponent', () => {
  let component: AuditTemplateTypeNewPageComponent;
  let fixture: ComponentFixture<AuditTemplateTypeNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditTemplateTypeNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditTemplateTypeNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
