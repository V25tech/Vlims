import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeactivateuserComponent } from './activate-deactivateuser.component';

describe('ActivateDeactivateuserComponent', () => {
  let component: ActivateDeactivateuserComponent;
  let fixture: ComponentFixture<ActivateDeactivateuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateDeactivateuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDeactivateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
