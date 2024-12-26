import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingOfMeetingComponent } from './meeting-of-meeting.component';

describe('MeetingOfMeetingComponent', () => {
  let component: MeetingOfMeetingComponent;
  let fixture: ComponentFixture<MeetingOfMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingOfMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingOfMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
