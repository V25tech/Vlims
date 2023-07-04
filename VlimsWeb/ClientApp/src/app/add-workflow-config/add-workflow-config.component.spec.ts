import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkflowConfigComponent } from './add-workflow-config.component';

describe('AddWorkflowConfigComponent', () => {
  let component: AddWorkflowConfigComponent;
  let fixture: ComponentFixture<AddWorkflowConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkflowConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkflowConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
