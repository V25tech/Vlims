import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalProfileAddPageComponent } from './functional-profile-add-page.component';

describe('FunctionalProfileAddPageComponent', () => {
  let component: FunctionalProfileAddPageComponent;
  let fixture: ComponentFixture<FunctionalProfileAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalProfileAddPageComponent]
    });
    fixture = TestBed.createComponent(FunctionalProfileAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
