import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingScheduleCreationComponent } from './meeting-schedule-creation.component';

describe('MeetingScheduleCreationComponent', () => {
  let component: MeetingScheduleCreationComponent;
  let fixture: ComponentFixture<MeetingScheduleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingScheduleCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingScheduleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
