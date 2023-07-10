import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchymanagementComponent } from './hierarchymanagement.component';

describe('HierarchymanagementComponent', () => {
  let component: HierarchymanagementComponent;
  let fixture: ComponentFixture<HierarchymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
