import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardConfigComponent } from './add-dashboard-config.component';

describe('AddDashboardConfigComponent', () => {
  let component: AddDashboardConfigComponent;
  let fixture: ComponentFixture<AddDashboardConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDashboardConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDashboardConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
