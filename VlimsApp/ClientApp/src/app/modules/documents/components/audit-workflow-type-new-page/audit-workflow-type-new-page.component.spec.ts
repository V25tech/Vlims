import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditWorkflowTypeNewPageComponent } from './audit-workflow-type-new-page.component';

describe('AuditWorkflowTypeNewPageComponent', () => {
  let component: AuditWorkflowTypeNewPageComponent;
  let fixture: ComponentFixture<AuditWorkflowTypeNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditWorkflowTypeNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditWorkflowTypeNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
