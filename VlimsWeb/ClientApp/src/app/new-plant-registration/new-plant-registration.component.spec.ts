import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlantRegistrationComponent } from './new-plant-registration.component';

describe('NewPlantRegistrationComponent', () => {
  let component: NewPlantRegistrationComponent;
  let fixture: ComponentFixture<NewPlantRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlantRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
