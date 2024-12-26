import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMinutesofMeetingComponent } from './new-minutesof-meeting.component';

describe('NewMinutesofMeetingComponent', () => {
  let component: NewMinutesofMeetingComponent;
  let fixture: ComponentFixture<NewMinutesofMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMinutesofMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMinutesofMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
