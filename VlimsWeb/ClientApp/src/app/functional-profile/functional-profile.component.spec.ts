import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalProfileComponent } from './functional-profile.component';

describe('FunctionalProfileComponent', () => {
  let component: FunctionalProfileComponent;
  let fixture: ComponentFixture<FunctionalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
