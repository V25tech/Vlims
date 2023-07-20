import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsergroupconfigurationComponent } from './add-usergroupconfiguration.component';

describe('AddUsergroupconfigurationComponent', () => {
  let component: AddUsergroupconfigurationComponent;
  let fixture: ComponentFixture<AddUsergroupconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsergroupconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsergroupconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
