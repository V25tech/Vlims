import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivesComponent } from './effectives.component';

describe('EffectivesComponent', () => {
  let component: EffectivesComponent;
  let fixture: ComponentFixture<EffectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EffectivesComponent]
    });
    fixture = TestBed.createComponent(EffectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
