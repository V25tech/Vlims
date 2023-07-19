import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupconfigurationComponent } from './usergroupconfiguration.component';

describe('UsergroupconfigurationComponent', () => {
  let component: UsergroupconfigurationComponent;
  let fixture: ComponentFixture<UsergroupconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
