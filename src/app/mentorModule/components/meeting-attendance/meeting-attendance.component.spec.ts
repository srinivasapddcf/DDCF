import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAttendanceComponent } from './meeting-attendance.component';

describe('MeetingAttendanceComponent', () => {
  let component: MeetingAttendanceComponent;
  let fixture: ComponentFixture<MeetingAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
