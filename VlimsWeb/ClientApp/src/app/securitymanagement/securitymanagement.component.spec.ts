import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritymanagementComponent } from './securitymanagement.component';

describe('SecuritymanagementComponent', () => {
  let component: SecuritymanagementComponent;
  let fixture: ComponentFixture<SecuritymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
