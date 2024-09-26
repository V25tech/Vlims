import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlantAddPageComponent } from './audit-plant-add-page.component';

describe('AuditPlantAddPageComponent', () => {
  let component: AuditPlantAddPageComponent;
  let fixture: ComponentFixture<AuditPlantAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditPlantAddPageComponent]
    });
    fixture = TestBed.createComponent(AuditPlantAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
