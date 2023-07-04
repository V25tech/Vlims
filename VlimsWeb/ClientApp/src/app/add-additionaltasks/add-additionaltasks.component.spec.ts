import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionaltasksComponent } from './add-additionaltasks.component';

describe('AddAdditionaltasksComponent', () => {
  let component: AddAdditionaltasksComponent;
  let fixture: ComponentFixture<AddAdditionaltasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdditionaltasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdditionaltasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
