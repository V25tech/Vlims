import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditdocumenttypesgridpageComponent } from './auditdocumenttypesgridpage.component';

describe('AuditdocumenttypesgridpageComponent', () => {
  let component: AuditdocumenttypesgridpageComponent;
  let fixture: ComponentFixture<AuditdocumenttypesgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditdocumenttypesgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditdocumenttypesgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
