import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPhotosListComponent } from './meeting-photos-list.component';

describe('MeetingPhotosListComponent', () => {
  let component: MeetingPhotosListComponent;
  let fixture: ComponentFixture<MeetingPhotosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingPhotosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
