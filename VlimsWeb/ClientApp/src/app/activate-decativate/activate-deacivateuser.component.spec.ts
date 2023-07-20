import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeacivateuserComponent } from './activate-deacivateuser.component';

describe('ActivateDeacivateuserComponent', () => {
  let component: ActivateDeacivateuserComponent;
  let fixture: ComponentFixture<ActivateDeacivateuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateDeacivateuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDeacivateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
