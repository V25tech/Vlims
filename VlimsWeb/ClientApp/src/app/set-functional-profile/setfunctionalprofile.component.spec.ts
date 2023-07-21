import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetfunctionalprofileComponent } from './setfunctionalprofile.component';

describe('SetfunctionalprofileComponent', () => {
  let component: SetfunctionalprofileComponent;
  let fixture: ComponentFixture<SetfunctionalprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetfunctionalprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetfunctionalprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
