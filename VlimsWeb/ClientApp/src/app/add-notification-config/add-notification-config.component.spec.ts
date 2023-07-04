import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotificationConfigComponent } from './add-notification-config.component';

describe('AddNotificationConfigComponent', () => {
  let component: AddNotificationConfigComponent;
  let fixture: ComponentFixture<AddNotificationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotificationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotificationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
