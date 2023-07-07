import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupConfigurationComponent } from './user-group-configuration.component';

describe('UserGroupConfigurationComponent', () => {
  let component: UserGroupConfigurationComponent;
  let fixture: ComponentFixture<UserGroupConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
