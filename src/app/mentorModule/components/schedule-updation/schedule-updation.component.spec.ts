import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUpdationComponent } from './schedule-updation.component';

describe('ScheduleUpdationComponent', () => {
  let component: ScheduleUpdationComponent;
  let fixture: ComponentFixture<ScheduleUpdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleUpdationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
