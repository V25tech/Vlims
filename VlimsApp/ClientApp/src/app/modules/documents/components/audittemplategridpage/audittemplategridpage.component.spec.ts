import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudittemplategridpageComponent } from './audittemplategridpage.component';

describe('AudittemplategridpageComponent', () => {
  let component: AudittemplategridpageComponent;
  let fixture: ComponentFixture<AudittemplategridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudittemplategridpageComponent]
    });
    fixture = TestBed.createComponent(AudittemplategridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
