import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpddmeetingattendanceComponent } from './npddmeetingattendance.component';

describe('NpddmeetingattendanceComponent', () => {
  let component: NpddmeetingattendanceComponent;
  let fixture: ComponentFixture<NpddmeetingattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpddmeetingattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpddmeetingattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
