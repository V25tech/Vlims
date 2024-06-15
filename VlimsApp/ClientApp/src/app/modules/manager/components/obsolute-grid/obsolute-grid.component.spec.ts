import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsoluteGridComponent } from './obsolute-grid.component';

describe('ObsoluteGridComponent', () => {
  let component: ObsoluteGridComponent;
  let fixture: ComponentFixture<ObsoluteGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObsoluteGridComponent]
    });
    fixture = TestBed.createComponent(ObsoluteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
