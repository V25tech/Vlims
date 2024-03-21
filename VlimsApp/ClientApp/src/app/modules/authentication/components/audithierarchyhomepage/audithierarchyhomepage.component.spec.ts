import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudithierarchyhomepageComponent } from './audithierarchyhomepage.component';

describe('AudithierarchyhomepageComponent', () => {
  let component: AudithierarchyhomepageComponent;
  let fixture: ComponentFixture<AudithierarchyhomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudithierarchyhomepageComponent]
    });
    fixture = TestBed.createComponent(AudithierarchyhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
