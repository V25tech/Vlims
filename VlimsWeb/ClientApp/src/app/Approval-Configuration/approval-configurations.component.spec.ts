import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalConfigurationsComponent } from './approval-configurations.component';

describe('ApprovalConfigurationsComponent', () => {
  let component: ApprovalConfigurationsComponent;
  let fixture: ComponentFixture<ApprovalConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
