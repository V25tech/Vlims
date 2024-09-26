import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDocumetTypeNewPageComponent } from './audit-documet-type-new-page.component';

describe('AuditDocumetTypeNewPageComponent', () => {
  let component: AuditDocumetTypeNewPageComponent;
  let fixture: ComponentFixture<AuditDocumetTypeNewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditDocumetTypeNewPageComponent]
    });
    fixture = TestBed.createComponent(AuditDocumetTypeNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
